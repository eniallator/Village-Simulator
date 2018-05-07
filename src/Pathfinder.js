import Hitbox from './Hitbox'
import Point from './Point'

class Pathfinder {
    constructor(map) {
        this.map = map
        this.networks = {}
    }
    
    _checkLineOfSight(node1, node2) {
        const gradient = (node1.hitbox.y - node2.hitbox.y) / (node1.hitbox.x - node2.hitbox.x)

        let xt = gradient < 0 ? -1 : 1
        let xb = gradient < 0 ? 1 : -1
    
        let node1Bottom = new Point(node1.hitbox.x + xb * node1.hitbox.width / 2, node1.hitbox.y + node1.hitbox.height / 2)
        let node1Top = new Point(node1.hitbox.x + xt * node1.hitbox.width / 2, node1.hitbox.y + -node1.hitbox.height / 2)
        
        let lowerLine = point => point.y > gradient * (point.x - node1Top.x) + node1Top.y
        let upperLine = point => point.y < gradient * (point.x - node1Bottom.x) + node1Bottom.y

        let roundingOffset = 0.0001
        let firstCheck = new Hitbox(
            node1.hitbox.x + (node2.hitbox.x - node1.hitbox.x) / 2 + roundingOffset,
            node1.hitbox.y + (node2.hitbox.y - node1.hitbox.y) / 2 + roundingOffset,
            Math.max(node1.hitbox.x - node2.hitbox.x + node1.hitbox.width, node2.hitbox.x - node1.hitbox.x + node2.hitbox.width) - roundingOffset * 2,
            Math.max(node1.hitbox.y - node2.hitbox.y + node1.hitbox.height, node2.hitbox.y - node1.hitbox.y + node2.hitbox.height) - roundingOffset * 2
        )

        for (let obstacle of this.map.obstacles) {
            if (firstCheck.detectCollision(obstacle.hitbox)) {
                let obsBottom = new Point(obstacle.x + xb * obstacle.width / 2, obstacle.y + obstacle.height / 2)
                let obsTop = new Point(obstacle.x + xt * obstacle.width / 2, obstacle.y + -obstacle.height / 2)

                if (lowerLine(obsBottom) && upperLine(obsTop)) return false
            }
        }

        return true
    }

    _buildNetwork(box) {
        let adjacencyList = []

        for (let focusedObstacle of this.map.obstacles) {
            const nodes = focusedObstacle.getNodes(box)
            const checkedNodes = nodes.filter(el => !this.map.checkCollision(new Hitbox(el.hitbox.pos, box.width, box.height)))
            for (let node of checkedNodes)
                adjacencyList.push({node: node, edges: []})
        }

        for (let i = 0; i < adjacencyList.length; i++) {
            for (let j = i + 1; j < adjacencyList.length; j++) {
                if (this._checkLineOfSight(adjacencyList[i].node, adjacencyList[j].node)) {
                    adjacencyList[i].edges.push(j)
                    adjacencyList[j].edges.push(i)
                }
            }
        }

        return adjacencyList
    }

    updateNetworks() {
        for (let network of Object.values(this.networks))
            network.update = true
    }

    addNetwork(box) {
        if (!(box instanceof Hitbox))
            return
        
        const key = 'w' + box.width + 'h' + box.height
        if (!(key in this.networks)) {
            let network = this._buildNetwork(box)
            this.networks[key] = network
        }
    }
}

export default Pathfinder