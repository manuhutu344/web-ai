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
            case "Alibaba":
                url: `https://www.alibaba.com/trade/search?sb=y&IndexArea=product_en&searchText=${selectedWebsite}`
                break;
            case "Jumia":
                url: `https://group.jumia.com.ng/catalog/?g=${selectedWebsite}`
                break;
                default:
                    return;
        }
        window.open(url, '_blank')
        setShowModel(false)
    }
  return (
    <div className={styles.container}>
        {credits < 1 ? (
            <UpgradeCard />
        ):(
            <>
            {imageSrc ? (
                <img src={imageSrc} alt="Capured" className={styles.image} />
            ):(
                <img src="https://ecam[le.com" alt="Masukan Foto" className={styles.image} />
            )}
            <h2 className={styles.title}>Ambil Foto Anda</h2>
            <p className={styles.description}>Untuk Kita Analisis Lebih Lanjut</p>
            <p className={styles.credits}>Credits: {credits}</p>
            <button className={styles.button} onClick={()=>{
                setIsCameraView(true)
                setCredits(prev =>Math.max(prev -25, 0))
            }} disabled={credits < 1}>
                Pake Kamera
            </button>
            <div className="flex justify-center space-x-4 mb-4">
                <div className="relative inline-block">
                    <input type="file" id="fileInput" accept="image/png, image.jpeg, image/jpg" onChange={(event)=>{
                        const file = event.target.files?.[0]
                        if(file) handleFileChange(file)
                    }} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                    <button className={styles.button} onClick={handleInputClick} disabled={credits < 1}>
                        Pilih Dari Komputer Anda
                    </button>
                </div>
            </div>
            {predictions && (
                <div className={styles.analysisContainer}>
                    <h3 className={styles.analysisTitle}>Hasil Analisis</h3>
                    <ul>
                        {predictions.map((concept, index)=>(
                            <li key={index} className={styles.analysisItem}>
                                {concept.className} : {Math.round(concept.probability * 100)}%
                            </li>
                        ))}
                    </ul>
                    <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none" onClick={handleBuyHairProducts}>
                        Beli Produk Rambut
                    </button>
                </div>
            )}
            {showModel && (
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <h3 className={styles.modalTitle}>Pilih Situs Web</h3>
                        <div className="flex flex-col space-y-2">
                            <button className={styles.websiteButton} onClick={()=>handleWebsiteClick('Amazon')}>
                                <img src={amazon} alt="Amazon" className="w-6 h-6" />
                                <span>Amazon</span>
                            </button>
                            <button className={styles.websiteButton} onClick={()=>handleWebsiteClick('Alibaba')}>
                                <img src={alibaba} alt="Alibaba" className="w-6 h-6" />
                                <span>Alibaba</span>
                            </button>
                            <button className={styles.websiteButton} onClick={()=>handleWebsiteClick('Jumia')}>
                                <img src={alibaba} alt="Jumiah" className="w-6 h-6" />
                                <span>Jumiah</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </>
        )}

    </div>
  )
}

export default ImageUploader