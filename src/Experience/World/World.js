import * as THREE from 'three'
import Experience from "../Experience";
import Environment from './Environment';

export default class World{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene

        // World
        this.environment = new Environment()

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 'white'
            })
        )

        this.scene.add(mesh)
    }
}