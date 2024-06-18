import { velocity } from './Position'
import { stateInfo } from './StateManager'

abstract class Controller {
    abstract getNewVelocity(state: stateInfo): velocity
    abstract reward(reward: number): void
}

export default Controller
