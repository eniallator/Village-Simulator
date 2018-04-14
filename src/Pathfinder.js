class Pathfinder {
    constructor() {
        this.networks = {}
    }

    buildNetwork(box) {
        // figure out what nodes have line of sight of eachother here and make edges
    }

    addNetwork(box) {
        if (!(box instanceof Hitbox))
            return
        
        const prefix = 'x' + box.x + 'y' + box.y + 'w' + box.width + 'h' + box.height
        if (!(prefix in this.networks)) {
            let network = this.buildNetwork(box)
            this.networks[prefix] = network
        }
    }
}