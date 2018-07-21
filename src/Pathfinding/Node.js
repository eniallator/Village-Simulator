import Point from '../Point'

class Node {
    constructor(pointOrX, y, distanceMultiplier = 1) {
        if (pointOrX instanceof Point) {
            this.pos = new Point(pointOrX.x, pointOrX.y)
            this.distanceMultiplier = y || 1
        } else {
            this.pos = new Point(pointOrX, y)
            this.distanceMultiplier = distanceMultiplier
        }
    }

    getDistance(node) {
        return this.distanceMultiplier * Math.sqrt(Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2))
    }

    get x() {
        return this.pos.x
    }
    get y() {
        return this.pos.y
    }
}

export default Node
