import Hitbox from '../Hitbox'
import Point from '../Point'
import Node from './Node'

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

        let xt = gradient < 0 ? -1 : 1
        let xb = gradient < 0 ? 1 : -1

        let node1Top = new Point(node1.x + xt * this.nodeWidth / 2, node1.y + -this.nodeHeight / 2)
        let node1Bottom = new Point(node1.x + xb * this.nodeWidth / 2, node1.y + this.nodeHeight / 2)

        let checkLowerBound = point => point.y > gradient * (point.x - node1Top.x) + node1Top.y
        let checkUpperBound = point => point.y < gradient * (point.x - node1Bottom.x) + node1Bottom.y

        let firstCheck = new Hitbox(
            Math.ceil(node1.x + (node2.x - node1.x) / 2),
            Math.ceil(node1.y + (node2.y - node1.y) / 2),
            Math.max(node1.x - node2.x + this.nodeWidth, node2.x - node1.x + this.nodeWidth),
            Math.max(node1.y - node2.y + this.nodeHeight, node2.y - node1.y + this.nodeHeight)
        )

        for (let obstacle of this.obstacles) {
            if (firstCheck.detectCollision(obstacle.hitbox)) {
                let obsTop = new Point(obstacle.x + xt * obstacle.width / 2, obstacle.y + -obstacle.height / 2)
                let obsBottom = new Point(obstacle.x + xb * obstacle.width / 2, obstacle.y + obstacle.height / 2)

                if (checkLowerBound(obsBottom) && checkUpperBound(obsTop)) return false
            }
        }

        return true
    }

    addNode(newNode) {
        if (newNode instanceof Node) {
            const newIndex = this.adjacencyList.push({node: newNode, edges: []}) - 1

            for (let currIndex in this.adjacencyList) {
                if (currIndex !== newIndex) {
                    let currNode = this.adjacencyList[currIndex].node

                    if (this._checkLineOfSight(newNode, currNode)) {
                        this.adjacencyList[newIndex].edges.push(currIndex)
                        this.adjacencyList[currIndex].edges.push(newIndex)
                    }
                }
            }
            
            return true
        }
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