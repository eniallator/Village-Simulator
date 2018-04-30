import Point from 'Point'

class Hitbox {
    constructor(pointOrX, y, width, height=null) {
        if (pointOrX instanceof Point) {
            this.pos = pointOrX
            this.width = y
            this.height = width
        } else {
            this.pos = new Point(pointOrX, y)
            this.width = width
            this.height = height
        }
    }

    detectCollision(boxOrPoint) {
        let box = boxOrPoint
        if (boxOrPoint instanceof Point)
            box = new Hitbox(boxOrPoint, 0, 0)
        
        return (box instanceof Hitbox) &&
            this.x - this.width / 2 < box.x + box.width / 2 &&
            box.x - box.width / 2 <= this.x + this.width / 2 &&
            this.y - this.height / 2 < box.y + box.height / 2 &&
            box.y - box.height / 2 <= this.y + this.height / 2
    }

    draw(ctx) {
        ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }

    get x () { return this.pos.x }
    set x(newX) { this.pos.x = newX }

    get y() { return this.pos.y }
    set y(newY) { this.pos.y = newY }
}

export default Hitbox