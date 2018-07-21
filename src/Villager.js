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
            walk: function(task) {
                if (!this.hitbox.detectCollision(task.hitbox)) this.moveTo(task.hitbox.pos)
                else return true
            },
            pathfind: function(task) {
                if (!('points' in task.data)) task.data.points = this.map.pathfind(this.hitbox, task.hitbox.pos)
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
            let dest = new Hitbox(Math.random() * 960, Math.random() * 540, 1, 1)
            console.log(dest.pos)
            this.taskQueue.push(new Task('Random pathing', 'pathfind', dest))
        }
    }

    draw(ctx) {
        const img = still
        const imgWidth = img.width * 2
        const imgHeight = img.height * 2

        const task = this.taskQueue[0]

        ctx.strokeStyle = 'red'
        if (task && 'points' in task.data) {
            ctx.beginPath()
            ctx.moveTo(this.pos.x, this.pos.y)
            ctx.lineTo(task.data.points[0].x, task.data.points[0].y)
            ctx.stroke()
        }

        ctx.strokeStyle = 'white'
        ctx.drawImage(img, this.pos.x - imgWidth / 2, this.pos.y - imgHeight, imgWidth, imgHeight)
    }
}

export default Villager
