import Apple from './Apple'
import {
    containsPosition,
    deltaPosition,
    movePosition,
    outsideMap,
    reverseVelocity,
    rotateLeft,
    rotateRight,
    velocity,
    velocityEquals,
} from './Position'
import Snake from './Snake'

interface stateInfo {
    snake: Snake
    apple: Apple
}

function getStateIndex(state: stateInfo): number {
    return getAppleIndex(state) * 8 + getDangerIndex(state)
}

function getAppleIndex(state: stateInfo): number {
    const appleDelta = deltaPosition(state.apple.getPos(), state.snake.getPos())
    let dir: velocity
    if (Math.abs(appleDelta.x) > Math.abs(appleDelta.y)) {
        dir = { x: appleDelta.x / Math.abs(appleDelta.x), y: 0 }
    } else {
        dir = { x: 0, y: appleDelta.y / Math.abs(appleDelta.y) }
    }

    if (velocityEquals(dir, rotateRight(state.snake.vel))) {
        return 1
    } else if (velocityEquals(dir, reverseVelocity(state.snake.vel))) {
        return 2
    } else if (velocityEquals(dir, rotateLeft(state.snake.vel))) {
        return 3
    } else {
        return 0
    }
}

function getDangerIndex(state: stateInfo): number {
    const adjacentPos = [
        movePosition(state.snake.getPos(), rotateLeft(state.snake.vel)),
        movePosition(state.snake.getPos(), state.snake.vel),
        movePosition(state.snake.getPos(), rotateRight(state.snake.vel)),
    ]

    let dangers = 0 // 000-111 (0-7)

    for (let i = 0; i < adjacentPos.length; i++) {
        if (
            outsideMap(adjacentPos[i]) ||
            containsPosition(
                adjacentPos[i],
                state.snake.tail.map((segment) => segment.pos)
            )
        ) {
            dangers += Math.pow(2, i)
        }
    }

    return dangers
}

export type { stateInfo }
export { getStateIndex }
