import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import Experience from "../Experience"

export default class Triforce{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.resource = this.resources.items.triforceModel
        this.setModel()
    }

    setModel(){
        const model = this.resource.scene.children[0]
        let geometry
        if(model.isMesh){
            geometry = new THREE.EdgesGeometry(model.geometry)
        } else {
            const allGeometries = []
            model.traverse((child) => {
                if(child.isMesh){
                    allGeometries.push(child.geometry)
                }
            })
            geometry = new THREE.EdgesGeometry(BufferGeometryUtils.mergeGeometries(allGeometries))
        }
        
        this.model = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: '#03FEFA'}))
        this.model.scale.setScalar(1.25)
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