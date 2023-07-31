import Experience from "../Experience"
import Environment from './Environment'
import Gameboy from './Gameboy'
import Cartridge from './Cartridge'
import GameboyText from './GameboyText'
import Floor from "./Floor"
import Logo from "./Logo"
import MarioBox from "./MarioBox"
import Pokeball from "./Pokeball"
import Tetris from "./Tetris"
import Triforce from "./Triforce"
import ThreeJsJourney from "./ThreeJsJourney"

export default class World{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.objet = []
        this.resources.on('ready', () => {
            // World
            this.floor = new Floor()
            this.gameboy = new Gameboy()
            this.cartridge = new Cartridge()
            this.objet.push(this.cartridge)
            this.logo = new Logo()
            this.objet.push(this.logo)
            this.marioBox = new MarioBox()
            this.objet.push(this.marioBox)
            this.pokeball = new Pokeball()
            this.objet.push(this.pokeball)
            this.tetris = new Tetris()
            this.objet.push(this.tetris)
            this.triforce= new Triforce()
            this.objet.push(this.triforce)
            this.gameboyText = new GameboyText()
            this.threeJsJourney = new ThreeJsJourney()

            // At end
            this.environment = new Environment()
        })
    }

    update(){
        if(this.cartridge){
            this.cartridge.update()
        }

        if(this.logo){
            this.logo.update()
        }

        if(this.marioBox){
            this.marioBox.update()
        }

        if(this.pokeball){
            this.pokeball.update()
        }

        if(this.tetris){
            this.tetris.update()
        }

        if(this.triforce){
            this.triforce.update()
        }

        if(this.threeJsJourney){
            this.threeJsJourney.update()
        }

        if(this.gameboyText){
            this.gameboyText.update()
        }
    }
}