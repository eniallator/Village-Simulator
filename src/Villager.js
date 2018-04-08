class Villager {
    constructor(x, y){
        this.pos = new Vector(x, y)
        this.speed = 4
    }

    moveTo(vec) {
        const diff = this.pos.getDifference(vec)
        const norm = diff.getNormalised()
        this.pos.add(norm.multiply(this.speed))
    }

    draw(ctx) {
        ctx.drawImage(assets['IMG']['villager-still'], this.pos.x, this.pos.y, 32, 96)
    }
}