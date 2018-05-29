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

        const xt = gradient < 0 ? -1 : 1
        const xb = gradient < 0 ? 1 : -1

        let node1Top = new Point(node1.x + xt * this.nodeWidth / 2, node1.y - this.nodeHeight / 2)
        let node1Bottom = new Point(node1.x + xb * this.nodeWidth / 2, node1.y + this.nodeHeight / 2)

        let checkLowerBound = point => point.y > gradient * (point.x - node1Top.x) + node1Top.y
        let checkUpperBound = point => point.y < gradient * (point.x - node1Bottom.x) + node1Bottom.y

        let surroundingBox = new Hitbox(
            Math.ceil(node1.x + (node2.x - node1.x) / 2),
            Math.ceil(node1.y + (node2.y - node1.y) / 2),
            Math.max(node1.x - node2.x + this.nodeWidth, node2.x - node1.x + this.nodeWidth),
            Math.max(node1.y - node2.y + this.nodeHeight, node2.y - node1.y + this.nodeHeight)
        )

        for (let obstacle of this.obstacles) {
            if (surroundingBox.detectCollision(obstacle.hitbox)) {
                let obsTop = new Point(obstacle.x + xt * obstacle.width / 2, obstacle.y - obstacle.height / 2)
                let obsBottom = new Point(obstacle.x + xb * obstacle.width / 2, obstacle.y + obstacle.height / 2)

                if (checkLowerBound(obsBottom) && checkUpperBound(obsTop)) return false
            }
        }

        return true
    }

    addNode(newNode) {
        if (newNode instanceof Node) {
            const newInstance = { node: newNode, edges: [] }

            for (let currIndex in this.adjacencyList) {
                const currNode = this.adjacencyList[currIndex].node

                if (this._checkLineOfSight(newNode, currNode)) {
                    newInstance.edges.push(currIndex)
                    this.adjacencyList[currIndex].edges.push(this.adjacencyList.length)
                }
            }

            this.adjacencyList.push(newInstance)
        }
    }

    getShortestRoute(srcIndex, destIndex) {
        const aList = this.adjacencyList

        let checkedNodes = []
        let priorityQueue = []

        priorityQueue.push({
            totalValue: 0,
            totalWeight: 0,
            prevNode: -1,
            index: srcIndex
        })

        let breakCounter = 10000
        let currNode

        while (priorityQueue.length) {
            if (!breakCounter--) throw new Error('Reactor overloaded')
            currNode = priorityQueue.shift()

            if (currNode.index === destIndex) break

            for (let edge of aList[currNode.index].edges) {
                if (checkedNodes.some(node => node.index === edge)) continue

                const hierarchicalValue = aList[destIndex].node.getDistance(aList[edge].node)
                const totalWeight = aList[currNode.index].node.getDistance(aList[edge].node) + currNode.totalWeight
                const totalValue = hierarchicalValue + totalWeight

                const priorityEdgeIndex = priorityQueue.findIndex(el => el.index === edge)

                if (priorityEdgeIndex > -1) {
                    const priorityEdge = priorityQueue[priorityEdgeIndex]

                    if (priorityEdge.totalValue <= totalValue) continue

                    priorityQueue.splice(priorityEdgeIndex, 1)
                }

                let queueIndex = 0

                for (let instance of priorityQueue) {
                    if (instance.totalValue < totalValue) {
                        queueIndex++
                    }
                }

                priorityQueue.splice(queueIndex, 0, {
                    index: edge,
                    prevNodeIndex: currNode.index,
                    totalValue,
                    totalWeight
                })
            }

            checkedNodes.push(currNode)
        }

        let fastestRoute = [this.adjacencyList[destIndex].node.pos]
        let srcNotFound = true
        let lastIndex = currNode.prevNodeIndex

        while (lastIndex !== srcIndex) {
            fastestRoute.unshift(this.adjacencyList[lastIndex].node.pos)
            lastIndex = checkedNodes.find(el => el.index === lastIndex).prevNodeIndex
        }

        fastestRoute.unshift(this.adjacencyList[srcIndex].node.pos)

        return fastestRoute
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
