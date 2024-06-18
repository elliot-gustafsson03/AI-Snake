import Entity from './Entity'
import { movePosition, position, velocity } from './Position'
import { WIDTH, HEIGHT } from './Constants'

class Snake extends Entity {
    protected pos: position
    protected color: string
    tail: tailSegment[]

    public vel: velocity = { x: 0, y: 0 }

    constructor() {
        super()
        this.pos = { x: Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2) }
        this.color = '#ffffff'
        this.tail = []
    }

    move() {
        if (this.tail.length > 0) {
            for (let i = this.tail.length - 1; i > 0; i--) {
                this.tail[i].pos = Object.assign({}, this.tail[i - 1].pos)
            }

            this.tail[0].pos = Object.assign({}, this.pos)
        }

        this.pos = movePosition(this.pos, this.vel)
    }

    grow() {
        this.tail.push({
            pos: Object.assign({}, this.pos),
            color: getRandomColor(),
        })
    }
}

export default Snake

interface tailSegment {
    pos: position
    color: string
}

function getRandomColor(): string {
    // Ensure each color component (R, G, B) is always between 128 and 255 for brightness
    const min = 128
    const max = 255

    const r = Math.floor(Math.random() * (max - min + 1)) + min
    const g = Math.floor(Math.random() * (max - min + 1)) + min
    const b = Math.floor(Math.random() * (max - min + 1)) + min

    // Convert each component to a 2-digit hexadecimal string
    const rHex = r.toString(16).padStart(2, '0')
    const gHex = g.toString(16).padStart(2, '0')
    const bHex = b.toString(16).padStart(2, '0')

    // Combine components into a single hex color string
    return `#${rHex}${gHex}${bHex}`
}
