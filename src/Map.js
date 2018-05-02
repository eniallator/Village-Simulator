import Village from './Village'
import Pathfinder from './Pathfinder'

class Map {
    constructor(boundary) {
        this.boundary = boundary
        this.pathfinder = new Pathfinder(this)

        this.obstacles = []
        this.villages = [new Village(this, this.boundary.x / 2, this.boundary.y / 2)]
    }

    registerObstacle(obstacle) {
        this.obstacles.push(obstacle)
        this.pathfinder.updateNetworks()
    }

    checkCollision(box) {
        for (let obstacle of this.obstacles) {
            if (box.hitbox.detectCollision(obstacle))
                return true
        }
    }

    pathfind(hitbox, destination) {
        
    }


    update() {
        for (let village of this.villages)
            village.update()
    }

    draw(ctx) {
        for (let village of this.villages)
            village.draw(ctx)
    }
}

export default Map