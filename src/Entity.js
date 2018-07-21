import Point from './Point'
import Hitbox from './Hitbox'

class Entity {
    constructor(x, y, width, height) {
        this.hitbox = new Hitbox(x, y, width, height)
    }

    get pos() {
        return this.hitbox.pos
    }

    get x() {
        return this.hitbox.x
    }
    get y() {
        return this.hitbox.y
    }
    get width() {
        return this.hitbox.width
    }
    get height() {
        return this.hitbox.height
    }
}

export default Entity
