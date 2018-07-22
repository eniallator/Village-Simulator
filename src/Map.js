import Pathfinder from './Pathfinding/Pathfinder'
import Village from './Village'

import Building from './Building'
import Hitbox from './Hitbox'

class Map {
    constructor(mapLimit) {
        this.mapLimit = mapLimit
        this.pathfinder = new Pathfinder(this)

        this.obstacles = []
        this.villages = [new Village(this, this.mapLimit.x / 2, this.mapLimit.y / 2)]
        for (let i = 0; i < 10; i++) new Building(this, Math.random() * this.mapLimit.x, Math.random() * this.mapLimit.y, 40, 20)
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
        this.pathfinder.drawNetwork(this._testHitbox, ctx)
        for (let obstacle of this.obstacles) obstacle.hitbox.draw(ctx)
        for (let village of this.villages) village.draw(ctx)
        ctx.strokeStyle = 'black'
    }
}

export default Map
