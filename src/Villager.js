class Villager extends Entity {
    constructor(x, y) {
        const sideLength = assets['IMG']['villager-still'].width * 2
        super(x, y, sideLength, sideLength)

        this.taskQueue = []
        this.speed = 4
    }

    moveTo(vec) {
        const diff = this.pos.getDifference(vec)
        const norm = diff.getNormalised()
        
        const diffMagnitude = diff.magnitude()
        if (diffMagnitude < this.speed) {
            norm.multiply(diffMagnitude)
        } else {
            norm.multiply(this.speed)
        }

        this.pos.add(norm)
    }

    draw(ctx) {
        const img = assets['IMG']['villager-still']
        const imgWidth = img.width * 4
        const imgHeight = img.height * 4

        ctx.drawImage(img, this.pos.x - imgWidth / 2, this.pos.y - imgHeight, imgWidth, imgHeight)
    }
}