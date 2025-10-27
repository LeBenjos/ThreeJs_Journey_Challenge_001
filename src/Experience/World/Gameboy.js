import gsap from "gsap";
import Experience from "../Experience";

export default class Gameboy {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.world = this.experience.world

        this.resource = this.resources.items.gameboyModel
        this.sound = {
            play: (sound) => {
                sound.currentTime = 0
                sound.play()
            },
            backgroundMusic: new Audio('./assets/sounds/background.mp3'),
            crossSelected: new Audio('./assets/sounds/crossSelectedSound.mp3'),
            easterEgg: new Audio('./assets/sounds/easterEgg.mp3'),
            boutonPress: new Audio('./assets/sounds/boutonPress.mp3')
        }
        this.sound.backgroundMusic.loop = true
        this.sound.backgroundMusic.volume = 0.2
        this.sound.crossSelected.volume = 0.5
        this.sound.boutonPress.volume = 0.5
        this.sound.easterEgg.volume = 0.5

        this.key = {
            a: false,
            b: false,
            arrowUp: false,
            arrowRight: false,
            arrowDown: false,
            arrowLeft: false,
            start: false,
            select: false,
            konami: [],
            easterEgg: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
        }

        this.setModel()

        window.addEventListener('keydown', (key) => {
            if ((key.code === 'KeyA' || key.code === 'KeyQ') && !this.key.a) {
                this.easterEgg('KeyA')
                this.pressA()
            }

            if (key.code === 'KeyB' && !this.key.b) {
                this.easterEgg('KeyB')
                this.pressB()
            }

            if (key.code === 'ArrowUp' && !this.key.arrowUp) {
                this.easterEgg('ArrowUp')
                this.pressArrowUp()
            }

            if (key.code === 'ArrowRight' && !this.key.arrowRight) {
                this.easterEgg('ArrowRight')
                this.pressArrowRight()
            }

            if (key.code === 'ArrowDown' && !this.key.arrowDown) {
                this.easterEgg('ArrowDown')
                this.pressArrowDown()
            }

            if (key.code === 'ArrowLeft' && !this.key.arrowLeft) {
                this.easterEgg('ArrowLeft')
                this.pressArrowLeft()
            }

            if (key.code === 'Escape' && !this.key.start) {
                this.pressStart()
            }

            if (key.code === 'Tab' && !this.key.select) {
                this.pressSelect()
            }
        })

        window.addEventListener('keyup', (key) => {
            if (key.code === 'KeyA' || key.code === 'KeyQ') {
                this.unPressA()
            }

            if (key.code === 'KeyB') {
                this.unPressB()
            }

            if (key.code === 'ArrowUp') {
                this.unPressArrowUp()
            }

            if (key.code === 'ArrowRight') {
                this.unPressArrowRight()
            }

            if (key.code === 'ArrowDown') {
                this.unPressArrowDown()
            }

            if (key.code === 'ArrowLeft') {
                this.unPressArrowLeft()
            }

            if (key.code === 'Escape') {
                this.unPressStart()
            }

            if (key.code === 'Tab') {
                this.unPressSelect()
            }
        })
    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
            }
        })
    }

    // Key A
    pressA() {
        this.key.a = true
        this.sound.play(this.sound.boutonPress)
        this.model.traverse((child) => {
            if (child.name === "butonA") {
                gsap.to(child.position, { duration: 0.25, y: 3.1 })
            }
        })
    }

    unPressA() {
        this.key.a = false
        this.model.traverse((child) => {
            if (child.name === "butonA") {
                gsap.to(child.position, { duration: 0.25, y: 3.2 })
            }
        })
    }

    // Key B
    pressB() {
        this.key.b = true
        this.model.traverse((child) => {
            if (child.name === "butonB") {
                gsap.to(child.position, { duration: 0.25, y: 3.1 })
            }
        })
    }

    unPressB() {
        this.key.b = false
        this.sound.play(this.sound.boutonPress)
        this.model.traverse((child) => {
            if (child.name === "butonB") {
                gsap.to(child.position, { duration: 0.25, y: 3.2 })
            }
        })
    }

    // Key ArrowUp
    pressArrowUp() {
        this.key.arrowUp = true
        this.model.traverse((child) => {
            if (child.name === "cross") {
                gsap.to(child.rotation, { duration: 0.25, x: -Math.PI * 0.025 })
            }
        })
    }

    unPressArrowUp() {
        this.key.arrowUp = false
        this.model.traverse((child) => {
            if (child.name === "cross") {
                gsap.to(child.rotation, { duration: 0.25, x: 0 })
            }
        })
    }

    // Key ArrowRight
    pressArrowRight() {
        this.key.arrowRight = true
        this.sound.play(this.sound.crossSelected)
        this.model.traverse((child) => {
            if (child.name === "cross") {
                gsap.to(child.rotation, { duration: 0.25, z: -Math.PI * 0.025 })
                for (let i = 0; i < this.world.objet.length; i++) {
                    if (this.world.threeJsJourney.model.visible == true) {
                        this.world.threeJsJourney.model.visible = false
                        this.world.objet[0].model.visible = true
                        return
                    } else if (this.world.objet[i].model.visible == true) {
                        if (i + 1 < this.world.objet.length) {
                            this.world.objet[i].model.visible = false
                            this.world.objet[i + 1].model.visible = true
                            return
                        } else {
                            this.world.objet[i].model.visible = false
                            this.world.objet[0].model.visible = true
                            return
                        }
                    }
                }
            }
        })
    }

    unPressArrowRight() {
        this.key.arrowRight = false
        this.model.traverse((child) => {
            if (child.name === "cross") {
                gsap.to(child.rotation, { duration: 0.25, z: 0 })
            }
        })
    }

    // Key ArrowDown
    pressArrowDown() {
        this.key.arrowDown = true
        this.model.traverse((child) => {
            if (child.name === "cross") {
                gsap.to(child.rotation, { duration: 0.25, x: Math.PI * 0.025 })
            }
        })
    }

    unPressArrowDown() {
        this.key.arrowDown = false
        this.model.traverse((child) => {
            if (child.name === "cross") {
                gsap.to(child.rotation, { duration: 0.25, x: 0 })
            }
        })
    }

    // Key ArrowLeft
    pressArrowLeft() {
        this.key.arrowLeft = true
        this.sound.play(this.sound.crossSelected)
        this.model.traverse((child) => {
            if (child.name === "cross") {
                gsap.to(child.rotation, { duration: 0.25, z: Math.PI * 0.025 })
                for (let i = 0; i < this.world.objet.length; i++) {
                    if (this.world.threeJsJourney.model.visible == true) {
                        this.world.threeJsJourney.model.visible = false
                        this.world.objet[this.world.objet.length - 1].model.visible = true
                        return
                    } else if (this.world.objet[i].model.visible == true) {
                        if (i - 1 >= 0) {
                            this.world.objet[i].model.visible = false
                            this.world.objet[i - 1].model.visible = true
                            return
                        } else {
                            this.world.objet[i].model.visible = false
                            this.world.objet[this.world.objet.length - 1].model.visible = true
                            return
                        }
                    }
                }
            }
        })
    }

    unPressArrowLeft() {
        this.key.arrowLeft = false
        this.model.traverse((child) => {
            if (child.name === "cross") {
                gsap.to(child.rotation, { duration: 0.25, z: 0 })
            }
        })
    }

    // Key Start

    pressStart() {
        this.key.start = true
        this.sound.play(this.sound.boutonPress)
        this.model.traverse((child) => {
            if (child.name === "butonStart") {
                gsap.to(child.position, { duration: 0.25, y: 3.1 })
                window.open("https://github.com/LeBenjos/ThreeJs_Journey_Challenge_001", "_blank");
            }
        })
    }

    unPressStart() {
        this.key.start = false
        this.model.traverse((child) => {
            if (child.name === "butonStart") {
                gsap.to(child.position, { duration: 0.25, y: 3.2 })
            }
        })
    }

    // Key Select

    pressSelect() {
        this.key.select = true
        this.sound.play(this.sound.boutonPress)
        this.model.traverse((child) => {
            if (child.name === "butonSelect") {
                gsap.to(child.position, { duration: 0.25, y: 3.1 })
                if (!this.sound.backgroundMusic.paused) {
                    this.sound.backgroundMusic.pause()
                } else {
                    this.sound.backgroundMusic.play()
                }
            }
        })
    }

    unPressSelect() {
        this.key.select = false
        this.model.traverse((child) => {
            if (child.name === "butonSelect") {
                gsap.to(child.position, { duration: 0.25, y: 3.2 })
            }
        })
    }

    // Easter Egg

    easterEgg(key) {
        if (this.key.konami.length < 10) {
            this.key.konami.push(key)
        } else {
            this.key.konami.shift()
            this.key.konami.push(key)
        }

        if (JSON.stringify(this.key.konami) == JSON.stringify(this.key.easterEgg)) {
            this.sound.play(this.sound.easterEgg)
            for (let i = 0; i < this.world.objet.length; i++) {
                if (this.world.objet[i].model.visible == true) {
                    this.world.objet[i].model.visible = false
                    this.world.threeJsJourney.model.visible = true
                }
            }
            console.log("Thanks to ThreeJs Journey!")
        }
    }
}