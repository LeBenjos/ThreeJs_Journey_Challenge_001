import * as THREE from 'three'
import Experience from "../Experience";

export default class Environment{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.resources = this.experience.resources

        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Environment')
            this.debugFolder.lights = this.debugFolder.addFolder('Lights')
        }

        this.setAmbientLight()
        this.setSunLight()
        this.setEnvironmentMap()
    }

    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
        this.scene.add(this.ambientLight)

        if(this.debug.active){
            // Debug Panel
            this.debugFolder.lights.ambient = this.debugFolder.lights.addFolder('Ambient')
            this.debugFolder.lights.ambient.add(this.ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient intensity')
        }
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 60
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.camera.top = 30
        this.sunLight.shadow.camera.bot = -30
        this.sunLight.shadow.camera.left = -30
        this.sunLight.shadow.camera.right = 30
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-17.5, 15, 14.5)
        this.sunLight.shadow.bias = 0
        this.scene.add(this.sunLight)

        if(this.debug.active){
            // Helper
            this.sunLightHelper = {}
            this.sunLightHelper.light = new THREE.DirectionalLightHelper(this.sunLight)
            this.sunLightHelper.shadow = new THREE.CameraHelper(this.sunLight.shadow.camera)
            this.sunLightHelper.shadow.visible = false
            this.scene.add(this.sunLightHelper.light, this.sunLightHelper.shadow)

            // Debug Panel
            this.debugFolder.lights.sun = this.debugFolder.lights.addFolder('Sun')
            this.debugFolder.lights.sun.add(this.sunLightHelper.light, 'visible').name('Light Helper')
            this.debugFolder.lights.sun.add(this.sunLightHelper.shadow, 'visible').name('Shadow Helper')
            this.debugFolder.lights.sun.add(this.sunLight, 'intensity').min(0).max(10).step(0.001).name('Intensity')
            this.debugFolder.lights.sun.add(this.sunLight.position, 'x').min(-10).max(10).step(0.001).name('Position X')
            this.debugFolder.lights.sun.add(this.sunLight.position, 'y').min(-10).max(10).step(0.001).name('Position Y')
            this.debugFolder.lights.sun.add(this.sunLight.position, 'z').min(-10).max(20).step(0.001).name('Position Z')
            this.debugFolder.lights.sun.add(this.sunLight.shadow, 'normalBias').min(0).max(1).step(0.001).name('Normal Bias')
            this.debugFolder.lights.sun.add(this.sunLight.shadow, 'bias').min(0).max(1).step(0.001).name('Bias')
        }
    }

    setEnvironmentMap(){
        this.environmentMap = {}
        this.environmentMap.intensity = 0.1
        this.environmentMap.texture = this.resources.items.environmentMapTexutre
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if(child.isMesh && child.material.isMeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }                
            })
        }
        this.environmentMap.updateMaterials()

        if(this.debug.active){
            // Debug Panel
            this.debugFolder.envMap = this.debugFolder.addFolder('Environment Map')
            this.debugFolder.envMap.add(this.environmentMap, 'intensity').min(0).max(1).step(0.01).name('Intensity').onChange(this.environmentMap.updateMaterials)
        }
    }
}