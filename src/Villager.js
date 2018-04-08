class Villager extends Entity {
    constructor(x, y) {
        const sideLength = assets['IMG']['villager-still'].width * 2
        super(x, y, sideLength, sideLength)
        this.speed = 4
    }

    moveTo(vec) {
        const diff = this.pos.getDifference(vec)
        const norm = diff.getNormalised()
        this.pos.add(norm.multiply(this.speed))
    }

    draw(ctx) {
        const img = assets['IMG']['villager-still']
        const imgWidth = img.width * 4
        const imgHeight = img.height * 4

        ctx.drawImage(img, this.pos.x - imgWidth / 2, this.pos.y - imgHeight, imgWidth, imgHeight)
    }
}