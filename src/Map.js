import Pathfinder from './Pathfinder'
import Village from './Village'

import Building from './Building'
import Hitbox from './Hitbox'

class Map {
    constructor(boundary) {
        this.boundary = boundary
        this.pathfinder = new Pathfinder(this)

        this.obstacles = []
        this.villages = [new Village(this, this.boundary.x / 2, this.boundary.y / 2)]
        for (let i = 0; i < 1; i++)
            this.obstacles.push(new Building(this, Math.random() * this.boundary.x, Math.random() * this.boundary.y, 40, 20))
        
        this.pathfinder.addNetwork(new Hitbox(1, 1, 20, 15))
    }

    registerObstacle(obstacle) {
        this.obstacles.push(obstacle)
        this.pathfinder.updateNetworks()
    }

    checkCollision(box) {
        for (let obstacle of this.obstacles) {
            if (box.detectCollision(obstacle))
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
        
        if (Object.keys(this.pathfinder.networks).length) {
            ctx.strokeStyle = 'lime'
            const key = Object.keys(this.pathfinder.networks)[0]
            let net = this.pathfinder.networks[key]
            for (let instance of net) {
                for (let edge of instance.edges) {
                    ctx.beginPath()
                    ctx.moveTo(instance.node.hitbox.x, instance.node.hitbox.y)
                    ctx.lineTo(net[edge].node.hitbox.x, net[edge].node.hitbox.y)
                    ctx.stroke()
                }
            }
            ctx.strokeStyle = 'black'
        }
    }
}

export default Map