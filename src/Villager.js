import Entity from './Entity'
import Hitbox from './Hitbox'
import Task from './Task'

import still_path from '../assets/images/villager/still.png'
const still = new Image()
still.src = still_path

class Villager extends Entity {
    constructor(map, x, y) {
        const sideLength = still.width * 2
        super(x, y, sideLength, sideLength)

        this.map = map

        this.actions = {
            pathfind: function(task) {
                if (!('points' in task.data)) task.data.points = this.map.pathfind(this.hitbox, task.data.hitbox.pos)
                if (task.data.points.length && this.pos.checkEquals(task.data.points[0])) task.data.points.shift()
                if (!task.data.points.length) return true
                this.moveTo(task.data.points[0])
            }
        }
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
        if (!(task instanceof Task)) return

        this.taskQueue.push(task)
    }

    update() {
        if (this.taskQueue.length > 0) {
            const done = this.actions[this.taskQueue[0].action].call(this, this.taskQueue[0])

            if (done === true) this.taskQueue.shift()
        } else {
            let dest
            do dest = new Hitbox(Math.random() * 960, Math.random() * 540, this.width, this.height)
            while (this.map.checkCollision(dest))
            this.taskQueue.push(new Task('Random pathing', 'pathfind', { hitbox: dest }))
        }
    }

    draw(ctx) {
        const img = still
        const imgWidth = img.width * 2
        const imgHeight = img.height * 2

        const task = this.taskQueue[0]

        ctx.strokeStyle = 'red'
        if (task && 'points' in task.data) {
            const points = [this.pos].concat(task.data.points)

            for (let i = 1; i < points.length; i++) {
                ctx.strokeStyle = `rgb(${255 - ((i - 1) / (points.length - 1)) * 255}, 0, 0)`
                ctx.beginPath()
                ctx.moveTo(points[i - 1].x, points[i - 1].y)
                ctx.lineTo(points[i].x, points[i].y)
                ctx.stroke()
            }
        }

        ctx.strokeStyle = 'white'
        ctx.drawImage(img, this.pos.x - imgWidth / 2, this.pos.y - imgHeight, imgWidth, imgHeight)
    }
}

export default Villager
