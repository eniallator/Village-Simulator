import Entity from './Entity'
import Point from './Point'
import Node from './Pathfinding/Node'

class Building extends Entity {
    constructor(map) {
        let argArray = [...arguments].slice(1)
        super(...argArray)

        map.registerObstacle(this)
    }

    getNodes(hitbox) {
        let nodes = []
        for (let xDir = -1; xDir <= 1; xDir += 2) {
            for (let yDir = -1; yDir <= 1; yDir += 2) {
                let nodePos = new Point(
                    this.pos.x + xDir * (this.width / 2 + hitbox.width / 2),
                    this.pos.y + yDir * (this.height / 2 + hitbox.height / 2)
                )

                nodes.push(new Node(nodePos))
            }
        }
        return nodes
    }
}

export default Building
