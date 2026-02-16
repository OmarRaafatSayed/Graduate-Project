import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import './Section2Canvas.css'

function RotatingModel({ modelPath, scale = 1 }) {
  const modelRef = useRef()
  const { scene } = useGLTF(modelPath)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <primitive 
      ref={modelRef} 
      object={scene.clone()} 
      scale={scale}
    />
  )
}

function Scene({ currentModel }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        castShadow
        target-position={[0, 0, 0]}
      />
      <pointLight position={[0, 3, 0]} intensity={1.5} distance={10} decay={2} />
      
      <AnimatePresence mode="wait">
        <motion.group
          key={currentModel}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RotatingModel modelPath={currentModel} scale={1.5} />
        </motion.group>
      </AnimatePresence>
    </>
  )
}

export default function RestorationMachine() {
  const models = [
    '/models/model.glb',
    '/models/model.glb',
    '/models/model.glb',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? models.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === models.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="restoration" className="section2-container">
      <h2 className="section-title">Restoration Machine</h2>
      <div className="fixed-canvas">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true }}
        >
          <Scene currentModel={models[currentIndex]} />
        </Canvas>

        <button className="nav-arrow left" onClick={handlePrev}>
          &#8249;
        </button>
        <button className="nav-arrow right" onClick={handleNext}>
          &#8250;
        </button>

        <div className="model-counter">
          {currentIndex + 1} / {models.length}
        </div>
      </div>
    </section>
  )
}

useGLTF.preload('/models/model.glb')
