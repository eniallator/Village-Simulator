import Hitbox from '../Hitbox'
import Network from './Network'
import Node from './Node'

class Pathfinder {
    constructor(map) {
        this.map = map
        this.networks = {}
    }

    _getNetworkKey(box) {
        return 'w' + box.width + 'h' + box.height
    }

    _getNetwork(box) {
        const key = this._getNetworkKey(box)

        if (!(key in this.networks)) {
            this.addNetwork(box)
        }

        return this.networks[key]
    }

    _buildNetwork(box) {
        let network = new Network(this.map.obstacles, box.width, box.height)
        let nodeList = []

        for (let focusedObstacle of this.map.obstacles) {
            const nodes = focusedObstacle.getNodes(box)
            const checkedNodes = nodes.filter(el => !this.map.checkCollision(new Hitbox(el.pos, box.width, box.height)))
            for (let node of checkedNodes) nodeList.push(node)
        }

        for (let node of nodeList) network.addNode(node)

        return network
    }

    updateNetworks() {
        for (let network of Object.values(this.networks)) network.update = true
    }

    getShortestRoute(box, destinationPoint) {
        const srcNode = new Node(box.pos)
        const destNode = new Node(destinationPoint)
        let network = this._getNetwork(box)

        return network.getShortestRoute(srcNode, destNode)
    }

    addNetwork(box) {
        if (!(box instanceof Hitbox)) return false

        const key = this._getNetworkKey(box)
        if (!(key in this.networks)) {
            let network = this._buildNetwork(box)
            this.networks[key] = network
        }

        return true
    }

    drawNetwork(box, ctx) {
        let network = this._getNetwork(box)
        network.draw(ctx)
    }
}

export default Pathfinder
