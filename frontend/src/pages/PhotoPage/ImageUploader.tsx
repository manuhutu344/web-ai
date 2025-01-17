import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {alibaba, amazon, jumia} from "../../assets/index"
import styles from "../../styles/ImageUploaderStyles"
import UpgradeCard from "../UpgradeCard"

interface Props{
    className: string,
    probability: number
}

interface ImageUploaderProps{
    imageSrc: string | null
    setImageSrc: (src: string | null) => void
    predictions: Props[] | null
    classifyImage: (file: File) => Promise<void>
    setIsCameraView: React.Dispatch<React.SetStateAction<boolean>>
}

function ImageUploader({imageSrc, setImageSrc, predictions, classifyImage, setIsCameraView}:ImageUploaderProps) {
    const navigate = useNavigate()
    const [showModel, setShowModel] = useState(false)
    const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null)
    const [credits, setCredits] = useState(150)

    async function handleFileChange(file: File){
        if(credits < 1){
            return
        }
        const reader = new FileReader()
        reader.onload = () =>{
            setImageSrc(reader.result as string)
            classifyImage(file)
            setCredits(prev => Math.max(prev - 25))
        }
        reader.readAsDataURL(file)
    }
    function handleInputClick(){
        document.getElementById('fileInput')?.click()
    }
    function handleBuyHairProducts(){
        if(predictions && predictions.length > 0){
            const topPrediction = predictions.reduce((prev, current)=>prev.probability > current.probability ?  prev:current)
            const product = encodeURIComponent(topPrediction.className + 'hair product')
            setSelectedWebsite(product)
            setShowModel(true)
        }else{
            alert("Tidak Ada Prediksinya")
        }
    }
    function handleWebsiteClick(website: string){
        let url = ''
        switch(website){
            case "Amazon":
                url = `https://www.amazon.com/s?k=${selectedWebsite}`
                break;
        }
    }
  return (
    <div>ImageUploader</div>
  )
}

export default ImageUploader