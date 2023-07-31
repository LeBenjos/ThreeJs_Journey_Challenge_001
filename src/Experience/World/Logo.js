import * as THREE from 'three'
import Experience from "../Experience"

export default class Logo{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.resource = this.resources.items.logoModel
        this.setModel()
    }

    setModel(){
        const model = this.resource.scene.children[0]
        const geometry = new THREE.EdgesGeometry(model.geometry)
        
        this.model = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: '#00ff00'}))
        this.model.scale.setScalar(1.5)
        this.model.position.set(model.position.x, model.position.y - 1, model.position.z)
        this.model.rotation.reorder('YXZ')
        this.model.rotation.set(model.rotation.x, model.rotation.y, model.rotation.z)
        this.model.visible = false

        this.scene.add(this.model)
    }

    update(){
        this.model.rotation.y = this.time.elapsed * 0.0005
    }
}