import * as THREE from 'three'
import Experience from "../Experience";

export default class Environment{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Environment')
            this.debugFolder.lights = this.debugFolder.addFolder('Lights')
            this.debugFolder.lights.ambient = this.debugFolder.lights.addFolder('Ambient')
            this.debugFolder.lights.sun = this.debugFolder.lights.addFolder('Sun')
        }

        this.setAmbientLight()
        this.setSunLight()
    }

    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
        this.scene.add(this.ambientLight)

        if(this.debug.active){
            this.debugFolder.lights.ambient.add(this.ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient intensity')
        }
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.shadow.bias = 0.05
        this.sunLight.position.set(5, 8, 5)
        this.scene.add(this.sunLight)

        if(this.debug.active){
            // Helper
            this.sunLightHelper = {}
            this.sunLightHelper.light = new THREE.DirectionalLightHelper(this.sunLight)
            this.sunLightHelper.shadow = new THREE.CameraHelper(this.sunLight.shadow.camera)
            this.sunLightHelper.shadow.visible = false
            this.scene.add(this.sunLightHelper.light, this.sunLightHelper.shadow)

            // Debug Panel
            this.debugFolder.lights.sun.add(this.sunLightHelper.light, 'visible').name('Light Helper')
            this.debugFolder.lights.sun.add(this.sunLightHelper.shadow, 'visible').name('Shadow Helper')
            this.debugFolder.lights.sun.add(this.sunLight, 'intensity').min(0).max(10).step(0.001).name('Sun intensity')
            this.debugFolder.lights.sun.add(this.sunLight.shadow, 'normalBias').min(0).max(1).step(0.001).name('Sun Normal Bias')
            this.debugFolder.lights.sun.add(this.sunLight.shadow, 'bias').min(0).max(1).step(0.001).name('Sun Bias')
        }
    }
}