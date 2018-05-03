import Hitbox from './Hitbox'
import Point from './Point'

class Pathfinder {
    constructor(map) {
        this.map = map
        this.networks = {}
    }
    
    _checkLineOfSight(node1, node2) {
        const gradient = (node1.pos.y - node2.pos.y) / (node1.pos.x - node2.pos.x)
        const sign = gradient < 0 ? -1 : 1
    
        let node1Top = new Point(node1.x + -sign * node1.width / 2, node1.y + sign * node1.height / 2)
        let node1Bottom = new Point(node1.x + sign * node1.width / 2, node1.y + -sign * node1.height / 2)
    
        let upperLine = point => point.y < gradient * (point.x - node1Bottom.x) + node1Bottom.y
        let lowerLine = point => point.y > gradient * (point.x - node1Top.x) + node1Top.y

        for (let obstacle of this.map.obstacles) {
            let obsTop = new Point(obstacle.x + -sign * obstacle.width, obstacle.y + sign * obstacle.height)
            let obsBottom = new Point(obstacle.x + sign * obstacle.width, obstacle.y + -sign * obstacle.height)

            if (upperLine(obsTop) && lowerLine(obsBottom)) return false
        }

        return true
    }

    _buildNetwork(box) {
        let adjacencyList = []

        for (let focusedObstacle of this.map.obstacles) {
            const nodes = focusedObstacle.getNodes(box)
            const checkedNodes = nodes.filter(el => !this.map.checkCollision(el))
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


    }

    updateNetworks() {
        for (let network of this.networks)
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