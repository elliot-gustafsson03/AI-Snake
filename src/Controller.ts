import { velocity } from './Position'

abstract class Controller {
    abstract getNewVelocity(): velocity
}

export default Controller
