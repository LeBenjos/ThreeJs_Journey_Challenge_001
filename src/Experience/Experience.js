import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"

export default class Experience{
    constructor(canvas){
        // Global access
        window.experience = this

        // Properties
        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()

        this.sizes.on('resize', () =>{
            this.resize()
        })

        this.time.on('tick', () =>{
            this.update()
        })
    }

    resize(){

    }

    update(){

    }
}