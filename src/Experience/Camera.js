import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import Experience from "./Experience";

export default class Camera{
    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.world = this.experience.world
        this.scene = this.experience.scene

        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Camera')
        }

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspectRatio,
            0.1,
            200
        )
        // this.instance.lookAt()
        this.instance.position.set(-40, 30, 25)
        this.scene.add(this.instance)

        if(this.debug.active){
            this.debugFolder.add(this.instance.position, 'x').min(-100).max(100).step(0.01).name('Position X')
            this.debugFolder.add(this.instance.position, 'y').min(-100).max(100).step(0.01).name('Position Y')
            this.debugFolder.add(this.instance.position, 'z').min(-100).max(100).step(0.01).name('Position Z')
        }
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.minDistance = 20
        this.controls.maxDistance = 100
    }

    resize(){
        this.instance.aspect = this.sizes.aspectRatio
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }
}
