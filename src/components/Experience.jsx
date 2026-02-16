import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const modelRef = useRef()
  const targetPosition = useRef({ x: -2, y: 0, z: 0 })
  const targetRotation = useRef({ x: 0, y: 0, z: 0 })

  const { scene } = useGLTF('/models/model.glb')

  useEffect(() => {
    if (!modelRef.current) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 769px)", () => {
      // Desktop: Section 1 -> 2: Move to RIGHT
      gsap.to(targetPosition.current, {
        x: 2,
        scrollTrigger: {
          trigger: '[data-section="2"]',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        }
      })

      // Section 2 -> 3: Move to CENTER
      gsap.to(targetPosition.current, {
        x: 0,
        scrollTrigger: {
          trigger: '[data-section="3"]',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        }
      })
    })

    mm.add("(max-width: 768px)", () => {
      // Mobile: Keep centered
      gsap.to(targetPosition.current, {
        x: 0,
        scrollTrigger: {
          trigger: '[data-section="2"]',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        }
      })
    })

    gsap.to(targetRotation.current, {
      y: Math.PI * 0.5,
      scrollTrigger: {
        trigger: '[data-section="2"]',
        start: 'top bottom',
        end: 'top center',
        scrub: 1,
      }
    })

    gsap.to(targetRotation.current, {
      y: Math.PI,
      scrollTrigger: {
        trigger: '[data-section="3"]',
        start: 'top bottom',
        end: 'top center',
        scrub: 1,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      mm.revert()
    }
  }, [])

  useFrame(() => {
    if (!modelRef.current) return

    // Smooth lerp for position
    modelRef.current.position.x += (targetPosition.current.x - modelRef.current.position.x) * 0.1
    modelRef.current.position.y += (targetPosition.current.y - modelRef.current.position.y) * 0.1
    modelRef.current.position.z += (targetPosition.current.z - modelRef.current.position.z) * 0.1

    // Smooth lerp for rotation
    modelRef.current.rotation.x += (targetRotation.current.x - modelRef.current.rotation.x) * 0.1
    modelRef.current.rotation.y += (targetRotation.current.y - modelRef.current.rotation.y) * 0.1
    modelRef.current.rotation.z += (targetRotation.current.z - modelRef.current.rotation.z) * 0.1
  })

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.roughness = 0.3
          child.material.metalness = 0.1
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  return (
    <>
      <Environment preset="sunset" />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <ambientLight intensity={0.5} />
      
      <primitive 
        ref={modelRef} 
        object={scene} 
        scale={1.5}
        position={[-2, 0, 0]}
      />
    </>
  )
}

useGLTF.preload('/models/model.glb')
