import { velocity } from './Position'
import { stateInfo } from './StateManager'

abstract class Controller {
    abstract getNewVelocity(state: stateInfo): velocity
    abstract reward(): void
    abstract punish(): void
}

export default Controller
