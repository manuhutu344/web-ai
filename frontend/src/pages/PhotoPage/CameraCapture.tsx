import React, {useEffect, useRef, useState} from "react"
import { styles } from "../../styles/CameraCaptureStyles"

const CameraCapture: React.FC <{
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
  setIsCameraView: React.Dispatch<React.SetStateAction<boolean>>
  classifyImage: (file: File) => Promise<void>
}> = ({setImageSrc, setIsCameraView, classifyImage}) =>{
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

 async function openCamera(){
  try {
     const stream = await navigator.mediaDevices.getUserMedia({video: true})
     if(videoRef.current){
      videoRef.current.srcObject = stream
      setIsCameraOpen(true)
     }

  } catch (error) {
    alert('Camera Gagal Memuat')
    setIsCameraView(false)
  }
 }
 const caputrePhoto = () => {
  if(canvasRef.current && videoRef.current){
    const context = canvasRef.current.getContext('2d')
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    context?.drawImage(videoRef.current, 0, 0)
    const caputuredImage = canvasRef.current.toDataURL('image/jpeg')
    setImageSrc(caputuredImage)
    const file = dataURLToFile(caputuredImage, 'captured-photo.jpg')
    classifyImage(file)
    const stream = videoRef.current.srcObject as MediaStream
    stream.getTracks().forEach((track)=> track.stop())
    setIsCameraView(false)
  }
 }
 const dataURLToFile = (dataUrl: string, filename: string) =>{
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const uBarr = new Uint8Array(n)
  while (n--){
    uBarr[n] = bstr.charCodeAt(n)
  }
  return new File([uBarr], filename, {type: mime})
 }
  return (
    <div className={styles.container}>
      <div className="relative">
        <video ref={videoRef} autoPlay className={styles.video}></video>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  )
}

export default CameraCapture