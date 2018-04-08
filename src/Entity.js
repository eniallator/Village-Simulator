class Entity {
    constructor(x, y, width, height) {
        this.pos = new Vector(x, y)
        this.hitbox = new Hitbox(this.pos, width, height)
    }

    get x() { return this.pos.x }
    get y() { return this.pos.y }
    get width() { return this.hitbox.width }
    get height() { return this.hitbox.height }
}