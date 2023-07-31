import * as THREE from 'three'
import Experience from '../Experience'

export default class Floor{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setFloor()
    }

    setFloor(){
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(100,100),
            new THREE.MeshStandardMaterial({
                color: "#fff6ba"
            })
        )
        floor.rotation.x = -Math.PI * 0.5
        floor.receiveShadow = true

        this.scene.add(floor)

        const wallLeft = new THREE.Mesh(
            new THREE.PlaneGeometry(100,100),
            new THREE.MeshStandardMaterial({
                color: "#fff6ba"
            })
        )
        wallLeft.position.set(0, 50, -50)
        wallLeft.receiveShadow = true

        this.scene.add(wallLeft)

        const wallRight = new THREE.Mesh(
            new THREE.PlaneGeometry(100,100),
            new THREE.MeshStandardMaterial({
                color: "#fff6ba"
            })
        )
        wallRight.position.set(50, 50, 0)
        wallRight.rotation.y = - Math.PI * 0.5
        wallRight.receiveShadow = true

        this.scene.add(wallRight)
    }
}