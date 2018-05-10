class Node {
    constructor(pos, distanceMultiplier=1) {
        this.pos = pos
        this.distanceMultiplier = distanceMultiplier
    }

    getDistance(node) {
        return this.distanceMultiplier * Math.sqrt(Math.pow(this.x - node.x) + Math.pow(this.y - node.y))
    }

    get x() {return this.pos.x}
    get y() {return this.pos.y}
}

export default Node