import Controller from './Controller'
import { velocity } from './Position'
import { stateInfo } from './StateManager'

class KeyboardController extends Controller {
    lastKey: string = ''

    constructor() {
        super()
        this.listen()
    }

    listen() {
        window.addEventListener('keydown', (e) => {
            this.lastKey = e.key
        })
    }

    getNewVelocity(state: stateInfo): velocity {
        let prevVel = state.snake.vel
        let newVel = { x: 0, y: 0 }

        switch (this.lastKey) {
            case 'ArrowUp':
                newVel.y = -1
                break
            case 'ArrowDown':
                newVel.y = 1
                break
            case 'ArrowLeft':
                newVel.x = -1
                break
            case 'ArrowRight':
                newVel.x = 1
                break
            default:
                return prevVel
        }

        if (newVel.x == -prevVel.x && newVel.y == -prevVel.y) {
            return prevVel
        }

        return newVel
    }
}

export default KeyboardController
