import Hitbox from '../Hitbox'
import Point from '../Point'
import Node from './Node'
import aStarFinder from './AStarFinder'

class Network {
    constructor(obstacles, nodeWidth, nodeHeight) {
        this.obstacles = obstacles
        this.nodeWidth = nodeWidth
        this.nodeHeight = nodeHeight

        this.adjacencyList = []
        this.update = false
    }

    _checkLineOfSight(node1, node2) {
        const gradient = (node1.y - node2.y) / (node1.x - node2.x)

        const xt = gradient < 0 ? -1 : 1
        const xb = gradient < 0 ? 1 : -1

        const node1Top = new Point(node1.x + (xt * this.nodeWidth) / 2, node1.y - this.nodeHeight / 2)
        const node1Bottom = new Point(node1.x + (xb * this.nodeWidth) / 2, node1.y + this.nodeHeight / 2)

        const checkLowerBound = point => point.y > gradient * (point.x - node1Top.x) + node1Top.y
        const checkUpperBound = point => point.y < gradient * (point.x - node1Bottom.x) + node1Bottom.y

        const roundingOffset = 0.000000001

        const surroundingBox = new Hitbox(
            node1.x + (node2.x - node1.x) / 2,
            node1.y + (node2.y - node1.y) / 2,
            Math.max(node1.x - node2.x + this.nodeWidth, node2.x - node1.x + this.nodeWidth) - roundingOffset,
            Math.max(node1.y - node2.y + this.nodeHeight, node2.y - node1.y + this.nodeHeight) - roundingOffset
        )

        for (let obstacle of this.obstacles) {
            if (surroundingBox.detectCollision(obstacle.hitbox)) {
                const obsTop = new Point(obstacle.x + (xt * obstacle.width) / 2, obstacle.y - obstacle.height / 2)
                const obsBottom = new Point(obstacle.x + (xb * obstacle.width) / 2, obstacle.y + obstacle.height / 2)

                if (checkLowerBound(obsBottom) && checkUpperBound(obsTop)) return false
            }
        }

        return true
    }

    addNode(newNode) {
        if (newNode instanceof Node) {
            const newInstance = { node: newNode, edges: [] }

            for (let i in this.adjacencyList) {
                const currIndex = Number(i)
                const currNode = this.adjacencyList[currIndex].node

                if (this._checkLineOfSight(newNode, currNode)) {
                    newInstance.edges.push(currIndex)
                    this.adjacencyList[currIndex].edges.push(this.adjacencyList.length)
                }
            }
            this.adjacencyList.push(newInstance)
        }
    }

    getShortestRoute(srcNode, destNode) {
        return aStarFinder(srcNode, destNode, this.adjacencyList, this._checkLineOfSight.bind(this))
    }

    draw(ctx) {
        for (let { node, edges } of this.adjacencyList) {
            ctx.strokeStyle = 'blue'
            ctx.strokeRect(node.x - this.nodeWidth / 2, node.y - this.nodeHeight / 2, this.nodeWidth, this.nodeHeight)
            for (let edge of edges) {
                ctx.strokeStyle = 'lime'
                ctx.beginPath()
                ctx.moveTo(node.x, node.y)
                ctx.lineTo(this.adjacencyList[edge].node.x, this.adjacencyList[edge].node.y)
                ctx.stroke()
            }
        }
        ctx.strokeStyle = 'black'
    }
}

export default Network
