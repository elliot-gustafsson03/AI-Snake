import { HEIGHT, WIDTH } from './Constants'

interface position {
    x: number
    y: number
}

interface velocity {
    x: number
    y: number
}

function outsideMap(pos: position): boolean {
    return pos.x < 0 || pos.x >= WIDTH || pos.y < 0 || pos.y >= HEIGHT
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

function velocityEquals(vel1: velocity, vel2: velocity): boolean {
    return positionEquals(vel1, vel2)
}

function deltaPosition(pos1: position, pos2: position): velocity {
    return { x: pos1.x - pos2.x, y: pos1.y - pos2.y }
}

function movePosition(pos: position, vel: velocity): position {
    return { x: pos.x + vel.x, y: pos.y + vel.y }
}

function statndingStill(vel: velocity): boolean {
    return vel.x == 0 && vel.y == 0
}

function rotateLeft(vel: velocity): velocity {
    return { x: vel.y, y: -vel.x }
}

function rotateRight(vel: velocity) {
    return { x: -vel.y, y: vel.x }
}

function reverseVelocity(vel: velocity) {
    return { x: -vel.x, y: -vel.y }
}

export type { position, velocity }
export {
    outsideMap,
    randomPosition,
    containsPosition,
    positionEquals,
    velocityEquals,
    deltaPosition,
    movePosition,
    statndingStill,
    rotateLeft,
    rotateRight,
    reverseVelocity,
}
