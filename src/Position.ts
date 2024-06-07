import { HEIGHT, WIDTH } from './Constants'

interface position {
    x: number
    y: number
}

interface velocity {
    x: number
    y: number
}

function randomPosition(ignore: position[]): position {
    while (true) {
        let randomPos = {
            x: Math.floor(Math.random() * WIDTH),
            y: Math.floor(Math.random() * HEIGHT),
        }

        if (!containsPosition(randomPos, ignore)) {
            return randomPos
        }
    }
}

function containsPosition(pos: position, list: position[]): boolean {
    for (let i = 0; i < list.length; i++) {
        if (positionEquals(pos, list[i])) {
            return true
        }
    }

    return false
}

function positionEquals(pos1: position, pos2: position): boolean {
    return pos1.x == pos2.x && pos1.y == pos2.y
}

export type { position, velocity }
export { randomPosition, containsPosition, positionEquals }
