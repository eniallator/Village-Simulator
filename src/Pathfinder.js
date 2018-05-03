import Hitbox from './Hitbox'
import Point from './Point'
let flag = 4
class Pathfinder {
    constructor(map) {
        this.map = map
        this.networks = {}
    }
    
    _checkLineOfSight(node1, node2) {
        const gradient = (node1.hitbox.y - node2.hitbox.y) / (node1.hitbox.x - node2.hitbox.x)
        const sign = gradient < 0 ? -1 : 1
    
        let node1Top = new Point(node1.hitbox.x + -sign * node1.hitbox.width / 2, node1.hitbox.y + sign * node1.hitbox.height / 2)
        let node1Bottom = new Point(node1.hitbox.x + sign * node1.hitbox.width / 2, node1.hitbox.y + -sign * node1.hitbox.height / 2)
        if (flag > 0) console.log(node1Top, node1Bottom)
    
        let upperLine = point => point.y < gradient * (point.x - node1Bottom.x) + node1Bottom.y
        let lowerLine = point => point.y > gradient * (point.x - node1Top.x) + node1Top.y

        for (let obstacle of this.map.obstacles) {
            let obsTop = new Point(obstacle.x + -sign * obstacle.width, obstacle.y + sign * obstacle.height)
            let obsBottom = new Point(obstacle.x + sign * obstacle.width, obstacle.y + -sign * obstacle.height)

            if (flag > 0) {
                console.log(obsTop, upperLine(obsTop), obsBottom, lowerLine(obsBottom))
                flag--
            }

            if (upperLine(obsTop) && lowerLine(obsBottom)) return false
        }

        return true
    }

    _buildNetwork(box) {
        let adjacencyList = []

        for (let focusedObstacle of this.map.obstacles) {
            const nodes = focusedObstacle.getNodes(box)
            const checkedNodes = nodes.filter(el => !this.map.checkCollision(new Hitbox(el.pos, box.width, box.height)))
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