import { position } from './Position'

abstract class Entity {
    protected abstract color: string
    protected abstract pos: position

    getPos(): position {
        return this.pos
    }

    getColor(): string {
        return this.color
    }
}

export default Entity
