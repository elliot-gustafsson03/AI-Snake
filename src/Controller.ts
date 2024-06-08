import { velocity } from './Position'
import { stateInfo } from './StateManager'

abstract class Controller {
    abstract getNewVelocity(state: stateInfo): velocity
}

export default Controller
