class Hitbox{
    constructor(vectorOrX, y, width, height=null) {
        if (vectorOrX instanceof Vector) {
            this.pos = vectorOrX
            this.width = y
            this.height = width
        } else {
            this.pos = new Vector(vectorOrX, y)
            this.width = width
            this.height = height
        }
    }

    AABBCollision(box) {
        if (box instanceof Hitbox &&
            this.x - this.width / 2 < box.x + box.width / 2 &&
            box.x - box.width / 2 <= this.x + this.width / 2 &&
            this.y - this.height / 2 < box.y + box.height / 2 &&
            box.y - box.height / 2 <= this.y + this.height / 2)
            return true

        return false
    }

    pointCollision(vec) {
        if (vec instanceof Vector &&
            this.x - this.width / 2 < vec.x &&
            vec.x <= this.x + this.width / 2 &&
            this.y - this.height / 2 < vec.y &&
            vec.y <= this.y + this.height / 2)
            return true
        return false
    }

    get x () { return this.pos.x }
    set x(newX) { this.pos.x = newX }

    get y() { return this.pos.y }
    set y(newY) { this.pos.y = newY }
}