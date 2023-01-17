import * as THREE from 'three'
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
const sizes={
  width: window.innerWidth,
  height: window.innerHeight
}
//Scene
const scene = new THREE.Scene()

//Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness:0.2 })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

//Lights
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.set(6, 10, 10)
scene.add(pointLight)


//camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
camera.position.z = 20;
scene.add(camera)


//Renderer
const canvas = document.querySelector('.canvas')
console.log(canvas)
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(2)
renderer.render(scene, camera)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 13

//Resize
window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

//Animation
const animate = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
    // sphere.rotation.x += 0.01
    // sphere.rotation.y += 0.01

}
animate()


const tl = gsap.timeline({defaults: {duration: '1'}})
tl.fromTo(sphere.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})


//mouse
let mouseDown = false
let rgb =[]
window.addEventListener('mousedown', () => {
  mouseDown = true
}
)
window.addEventListener('mouseup', () => {
  mouseDown = false
}
)

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    rgb=[
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.width)*255),
      150,
    ]
    console.log(rgb)
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(sphere.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
  }
}
)