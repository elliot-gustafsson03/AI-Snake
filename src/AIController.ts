import Controller from './Controller'
import { rotateLeft, rotateRight, statndingStill, velocity } from './Position'
import QTable, { stateAction } from './QTable'
import { getStateIndex, stateInfo } from './StateManager'

class AIController extends Controller {
    qTable: QTable
    prevState: stateAction | undefined
    exploreRate: number = 0.5

    constructor() {
        super()
        this.qTable = new QTable()
    }

    getNewVelocity(state: stateInfo): velocity {
        if (statndingStill(state.snake.vel)) {
            state.snake.vel = { x: 0, y: -1 }
        }

        const stateIndex = getStateIndex(state)
        const dir = this.explore()
            ? this.qTable.getBestAction(stateIndex)
            : this.qTable.randomAction()

        this.prevState = { stateIndex: stateIndex, action: dir }

        switch (dir) {
            case 0:
                return rotateLeft(state.snake.vel)
            case 1:
                return state.snake.vel
            case 2:
                return rotateRight(state.snake.vel)
            default:
                return state.snake.vel
        }
    }

    explore(): boolean {
        return this.exploreRate < Math.random()
    }

    reduceExploreRate(highscore: number): void {
        this.exploreRate = 0.1 * Math.pow(0.9, highscore)
        console.log(this.exploreRate)
    }

    reward(reward: number): void {
        console.log(reward)
        if (this.prevState) this.qTable.addWeight(this.prevState, reward)
    }
}

export default AIController
