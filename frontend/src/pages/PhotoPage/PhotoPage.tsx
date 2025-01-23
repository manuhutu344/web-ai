import ImageUploader from "./ImageUploader"
import CameraCapture from "./CameraCapture"
import { useState, useEffect } from "react"
import * as tmImage from "@teachablemachine/image"

function PhotoPage() {
  const [isCameraView, setIsCameraView] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<any | null>(null)
  const [model, setModel] = useState<any | null>(null)
  const modelURL = 'https://teachablemachine.withgoogle.com/models/vEdU4im2s/model.json'
  const metadataURL = "https://teachablemachine.withgoogle.com/models/vEdU4im2s/metadata.json"
   useEffect(()=>{
    const loadModel = async()=>{
      const loadModel = await tmImage.load(modelURL, metadataURL)
      setModel(loadModel)
    }
    loadModel()
   }, [])
   async function classifyImage(file: File){
    if(!model) return
    const image = document.createElement('img')
    image.src = URL.createObjectURL(file)
    image.onload = async () =>{
      const prediction = await model.predict(image)
      setPredictions(prediction)
      const predictionData = prediction.map((pred: any)=>({
        className: pred.className,
        probability: pred.probability
      }))
    }
   }
  return (
    <div className="min-h-screen bg-gardient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col items-center justify-center">
      {isCameraView ? (
        <CameraCapture setImageSrc={setImageSrc} setIsCameraView={setIsCameraView} classifyImage={classifyImage} />
      ):(
        <ImageUploader imageSrc={imageSrc} setImageSrc={setImageSrc} predictions={predictions} classifyImage={classifyImage} setIsCameraView={setIsCameraView}  />
      )}
    </div>
  )
}

export default PhotoPage