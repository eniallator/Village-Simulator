import Hitbox from './Hitbox'

class Pathfinder {
    constructor(map) {
        this.map = map
        this.networks = {}
    }

    _buildNetwork(box) {
        let adjacencyList = []

        for (let focusedObstacle of this.map.obstacles) {
            const nodes = focusedObstacle.getNodes(box)
            const checkedNodes = nodes.filter(el => this.map.checkCollision(el))
            for (let node of checkedNodes)
                adjacencyList.push({node: node, edges: []})
        }

        for (let outerKey in adjacencyList) {
            for (let innerKey in adjacencyList) {
                if (outerKey !== innerKey) {

                    // line of sight code here
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