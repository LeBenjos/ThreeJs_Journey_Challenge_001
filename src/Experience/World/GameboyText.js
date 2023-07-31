import * as THREE from 'three'
import Experience from "../Experience"

export default class GameboyText{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.resource = this.resources.items.gameboyTextModel
        this.setModel()
    }

    setModel(){
        this.model = this.resource.scene
        this.scene.add(this.model)
        this.time = this.experience.time

        this.model.traverse((child) => {
            if(child.isMesh){
                child.castShadow = true
                child.material.roughness = 0.75
            }
        })
    }

    update(){
        this.model.traverse((child) => {
            if(child.isMesh){
                if(child.name === "letterG" || child.name === "letterM" || child.name === "letterB" || child.name === "letterY"){
                    child.position.y = child.position.y + Math.sin(this.time.elapsed * 0.003) * 0.0025
                } else {
                    child.position.y = child.position.y + Math.sin(this.time.elapsed * 0.003) * -0.0025
                }
            }
        })
    }
}