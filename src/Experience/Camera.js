import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import Experience from "./Experience";

export default class Camera{
    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        this.scene = this.experience.scene

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
        this.instance.position.set(-35, 30, 29)
        this.scene.add(this.instance)
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.aspectRatio
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }
}
