import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import './HeroSection.css'

function FloatingModel({ position, rotation, scale }) {
  const modelRef = useRef()
  const { scene } = useGLTF('/models/model.glb')
  const offset = useRef(Math.random() * Math.PI * 2)

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5 + offset.current) * 0.3
    }
  })

  return (
    <primitive 
      ref={modelRef}
      object={scene.clone()}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

function Scene() {
  const models = [
    { position: [-4, 3, -2], rotation: [0.3, -0.5, 0.2], scale: 1.2 },
    { position: [4, 3.5, -1], rotation: [-0.2, 0.8, -0.3], scale: 1.5 },
    { position: [-3.5, -3, -2.5], rotation: [0.5, 0.3, 0.4], scale: 1 },
    { position: [4.5, -2.5, -1.5], rotation: [-0.4, -0.6, 0.1], scale: 1.3 }
  ]

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <spotLight position={[-10, 10, 5]} intensity={1.5} angle={0.3} penumbra={1} />
      
      {models.map((props, index) => (
        <FloatingModel key={index} {...props} />
      ))}
    </>
  )
}

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">THE ART OF<br/>MASHRABIYA</h1>
        <p className="hero-subtitle">A Digital Collage of Heritage</p>
      </div>
    </section>
  )
}
