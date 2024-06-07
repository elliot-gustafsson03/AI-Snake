import Entity from './Entity'
import { position } from './Position'

class Apple extends Entity {
    protected pos: position
    protected color: string

    constructor(pos: position) {
        super()
        this.pos = pos
        this.color = '#fc664c'
    }
}

export default Apple
