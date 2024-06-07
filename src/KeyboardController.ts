import Controller from './Controller'
import { velocity } from './Position'

class KeyboardController extends Controller {
    lastKey: string = ''
    prevVel: velocity = { x: 0, y: 0 }

    constructor() {
        super()
        this.listen()
    }

    listen() {
        window.addEventListener('keydown', (e) => {
            this.lastKey = e.key
        })
    }

    getNewVelocity(): velocity {
        let newVelocity = { x: 0, y: 0 }

        switch (this.lastKey) {
            case 'ArrowUp':
                newVelocity.y = -1
                break
            case 'ArrowDown':
                newVelocity.y = 1
                break
            case 'ArrowLeft':
                newVelocity.x = -1
                break
            case 'ArrowRight':
                newVelocity.x = 1
                break
            default:
                return this.prevVel
        }

        if (
            newVelocity.x == -this.prevVel &&
            newVelocity.y == -this.prevVel.y
        ) {
            return this.prevVel
        }

        this.prevVel = newVelocity
        return newVelocity
    }
}

export default KeyboardController
