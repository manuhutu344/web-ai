import {Canvas, useFrame} from "@react-three/fiber"
import {OrbitControls, useGLTF, useTexture} from "@react-three/drei"
import * as THREE from "three"
import girl from '../models/source/girl.glb'
import textureImage from '../models/textures/textureImage.png'
import styles from "../styles/HeroSectionStyles"
import React, { useRef } from "react"

const BlowDryer:React.FC = () =>{
    const {scene} = useGLTF(girl)
    const texture = useTexture(textureImage)
    const modelRef = useRef<THREE.Object3D>()
    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({ map: texture });
        }
      })
    useFrame((state)=>{
        if(modelRef.current){
            modelRef.current.rotation.y = state.clock.getElapsedTime()*0.5
        }
    })
    return <primitive ref={modelRef} object={scene} scale={1.5} />
}

function HeroSection() {
  return (
    <section className={styles.section}>
        <div className={styles.textContainer}>
            <h2 className={styles.title}>
                Kami <span className="text-green-500">Fokus</span> Memperbaiki <br /> Rambut Anda
            </h2>
            <p className={styles.description}>
                Buat Rambut Anda Lebih Baik Dengan App ini, Dengan Menggunakan Ai Rambut Anda Dapat Di Rawat
            </p>
            <button className={styles.getStartedButton}>
                Mulai
            </button>
        </div>
        <div className={styles.canvasContainer}>
            <div className={styles.gradientCircle}>

            </div>
            <Canvas>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={0.5} />
                <BlowDryer  />
                <OrbitControls />
            </Canvas>
        </div>
    </section>
  )
}

export default HeroSection