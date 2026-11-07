import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default function CarScene({ layer, exploded }) {
  const containerRef = useRef(null)
  const groupsRef = useRef({})

  useEffect(() => {
    const container = containerRef.current
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      container.textContent = '3D view unavailable on this device. You can still browse service topics below.'
      container.classList.add('scene-fallback')
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(7.7, 5, 8.5)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.minDistance = 6
    controls.maxDistance = 16
    controls.maxPolarAngle = Math.PI / 2.05
    controls.target.set(0, 0.8, 0)

    scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c7bc, 2.3))
    const light = new THREE.DirectionalLight(0xffffff, 2.5)
    light.position.set(4, 9, 6)
    scene.add(light)

    const groups = {}
    for (const id of ['exterior', 'chassis', 'powertrain', 'electrical']) {
      groups[id] = new THREE.Group()
      scene.add(groups[id])
    }
    groupsRef.current = groups

    function box(group, size, position, color, options = {}) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), new THREE.MeshStandardMaterial({ color, roughness: 0.54, metalness: 0.15, ...options }))
      mesh.position.set(...position)
      group.add(mesh)
      return mesh
    }
    function wheel(x, z) {
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.36, 32), new THREE.MeshStandardMaterial({ color: 0x252c2c, roughness: 0.9 }))
      tire.rotation.x = Math.PI / 2
      tire.position.set(x, 0.53, z)
      groups.chassis.add(tire)
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.38, 24), new THREE.MeshStandardMaterial({ color: 0xa2b1ad, metalness: 0.65, roughness: 0.35 }))
      hub.rotation.x = Math.PI / 2
      hub.position.copy(tire.position)
      groups.chassis.add(hub)
    }
    box(groups.chassis, [4.5, 0.22, 1.8], [0, 0.55, 0], 0x697f7d)
    for (const x of [-1.45, 1.45]) for (const z of [-1, 1]) wheel(x, z)
    box(groups.powertrain, [2.4, 0.19, 1.35], [0, 0.72, 0], 0x8db4a0)
    box(groups.powertrain, [0.65, 0.38, 0.8], [-1.55, 0.75, 0], 0x647f73)
    box(groups.electrical, [1.9, 0.1, 0.1], [0.15, 0.88, 0.35], 0xe9a455)
    box(groups.electrical, [0.45, 0.18, 0.38], [1.35, 0.85, 0.35], 0xd5ad68)
    box(groups.exterior, [4.65, 0.58, 1.9], [0, 1.03, 0], 0xd0dcd7)
    box(groups.exterior, [2.35, 0.55, 1.72], [-0.15, 1.58, 0], 0x9cafaa)
    box(groups.exterior, [2.05, 0.4, 1.76], [-0.15, 1.63, 0], 0x344c4b, { metalness: 0.35 })
    box(groups.exterior, [1.55, 0.09, 1.58], [-0.18, 1.89, 0], 0xd0dcd7)
    for (const z of [-0.67, 0.67]) {
      box(groups.exterior, [0.08, 0.16, 0.36], [2.34, 1.13, z], 0xf8f2d8, { emissive: 0x736c50 })
      box(groups.exterior, [0.08, 0.14, 0.36], [-2.34, 1.13, z], 0xa5594a)
    }
    const grid = new THREE.GridHelper(12, 24, 0xcbd6cf, 0xdce5df)
    grid.position.y = -0.02
    scene.add(grid)

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    resize()
    let frame
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      controls.dispose()
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
      groupsRef.current = {}
    }
  }, [])

  useEffect(() => {
    const offsets = { exterior: 2.1, electrical: 1.3, powertrain: 0.7, chassis: 0 }
    for (const [id, group] of Object.entries(groupsRef.current)) {
      group.position.y = exploded ? offsets[id] : 0
      group.traverse((object) => {
        if (!object.isMesh) return
        object.material.transparent = layer !== 'all' && layer !== id
        object.material.opacity = object.material.transparent ? 0.13 : 1
        object.material.depthWrite = !object.material.transparent
        object.material.needsUpdate = true
      })
    }
  }, [layer, exploded])

  return <div ref={containerRef} className="car-scene" aria-label="Conceptual interactive 3D car illustration" />
}
