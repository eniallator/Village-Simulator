import Entity from './Entity'
import Node from './Pathfinding/Node'

class Obstacle extends Entity {
    getNodes(hitbox) {
        let nodes = []
        for (let xDir = -1; xDir <= 1; xDir += 2) {
            for (let yDir = -1; yDir <= 1; yDir += 2) {
                nodes.push(
                    new Node(this.x + xDir * (this.width / 2 + hitbox.width / 2), this.y + yDir * (this.height / 2 + hitbox.height / 2))
                )
            }
        }
        return nodes
    }
}

export default Obstacle
