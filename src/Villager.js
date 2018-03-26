class Villager {
    constructor(x, y){
        this.pos = new Vector(x, y)
    }

    move(vec) {
        this.pos.add(vec)
    }

    draw(ctx) {
        ctx.drawImage(assets['IMG']['villager-still'], this.pos.x, this.pos.y, 32, 96)
    }
}