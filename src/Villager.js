class Villager extends Entity {
    constructor(x, y) {
        const sideLength = assets['IMG']['villager-still'].width * 2
        super(x, y, sideLength, sideLength)

        this.taskQueue = []
        this.speed = 4
        this.actions = {
            walk: task => this.moveTo(task.hitbox.pos)
        }
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

    addTask(task) {
        if (!task instanceof Task)
            return
        
        this.taskQueue.push(task)
    }

    update() {
        if (this.taskQueue.length > 0) {
            this.actions[this.taskQueue[0].action].call(this, this.taskQueue[0])
        }
    }

    draw(ctx) {
        const img = assets['IMG']['villager-still']
        const imgWidth = img.width * 2
        const imgHeight = img.height * 2

        ctx.drawImage(img, this.pos.x - imgWidth / 2, this.pos.y - imgHeight, imgWidth, imgHeight)
    }
}