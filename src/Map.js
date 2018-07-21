import Pathfinder from './Pathfinding/Pathfinder'
import Village from './Village'

import Building from './Building'
import Hitbox from './Hitbox'
// import Point from './Point'

class Map {
    constructor(mapLimit) {
        this.mapLimit = mapLimit
        this.pathfinder = new Pathfinder(this)

        this.obstacles = []
        this.villages = [new Village(this, this.mapLimit.x / 2, this.mapLimit.y / 2)]
        for (let i = 0; i < 10; i++) new Building(this, Math.random() * this.mapLimit.x, Math.random() * this.mapLimit.y, 40, 20)
        // new Building(this, 128.11692413715804, 357.8589330940374, 40, 20)
        // new Building(this, 232.03693918298669, 155.7435498624676, 40, 20)
        // new Building(this, 378.05638449034166, 283.423314455419, 40, 20)
        // new Building(this, 473.8763367217239, 420.1135087049392, 40, 20)
        // new Building(this, 543.6433718264632, 243.64415717211193, 40, 20)
        this._testHitbox = new Hitbox(Math.random() * 960, Math.random() * 540, 16, 16)

        this.pathfinder.addNetwork(this._testHitbox)
    }

    registerObstacle(obstacle) {
        this.obstacles.push(obstacle)
        this.pathfinder.updateNetworks()
    }

    checkCollision(box) {
        if (box.x < 0 || box.y < 0 || box.x + box.width > this.mapLimit.x || box.y + box.height > this.mapLimit.y) return true

        for (let obstacle of this.obstacles) {
            if (box.detectCollision(obstacle.hitbox)) return true
        }
    }

    pathfind(box, destinationPoint) {
        return this.pathfinder.getShortestRoute(box, destinationPoint)
    }

    update() {
        for (let village of this.villages) village.update()
    }

    draw(ctx) {
        for (let village of this.villages) village.draw(ctx)

        ctx.strokeStyle = 'black'

        for (let obstacle of this.obstacles) obstacle.hitbox.draw(ctx)

        this.pathfinder.drawNetwork(this._testHitbox, ctx)

        // const destPoint = new Point(Math.random() * 960, Math.random() * 540)
        // const points = this.pathfinder.getShortestRoute(this._testHitbox, destPoint)
        // for (let i = 1; i < points.length; i++) {
        //     ctx.strokeStyle = `rgb(${255 - ((i - 1) / (points.length - 1)) * 255}, 0, 0)`
        //     ctx.beginPath()
        //     ctx.moveTo(points[i - 1].x, points[i - 1].y)
        //     ctx.lineTo(points[i].x, points[i].y)
        //     ctx.stroke()
        // }
    }
}

export default Map
