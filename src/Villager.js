ACTIONS = {
    walk: function(task) { if (!this.hitbox.detectCollision(task.hitbox)) this.moveTo(task.hitbox.pos) }
}

class Villager extends Entity {
    constructor(x, y) {
        const sideLength = assets['IMG']['villager-still'].width * 2

        super(x, y, 16, 32)

        this.taskQueue = []
        this.speed = 1
    }

    moveTo(point) {
        const diff = this.pos.getDifference(point)
        const norm = diff.getNormalised()
        
        const diffMagnitude = diff.getMagnitude()
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
            ACTIONS[this.taskQueue[0].action].call(this, this.taskQueue[0])
        }
    }

    draw(ctx) {
        const img = assets['IMG']['villager-still']
        const imgWidth = img.width * 2
        const imgHeight = img.height * 2

        ctx.drawImage(img, this.pos.x - imgWidth / 2, this.pos.y - imgHeight, imgWidth, imgHeight)
    }
}