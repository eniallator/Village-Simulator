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

    _addToPriorityQueue(priorityQueue, item) {
        let queueIndex = 0

        for (let instance of priorityQueue) {
            if (instance.totalValue < item.totalValue) {
                queueIndex++
            } else {
                break
            }
        }

        priorityQueue.splice(queueIndex, 0, item)
    }

    _initPriorityQueue(srcNode, destNode) {
        let priorityQueue = []

        for (let index in this.adjacencyList) {
            const nodeRef = this.adjacencyList[index].node
            if (this._checkLineOfSight(srcNode, nodeRef)) {
                const hierarchicalValue = destNode.getDistance(nodeRef)
                const totalWeight = srcNode.getDistance(nodeRef)
                const totalValue = hierarchicalValue + totalWeight

                this._addToPriorityQueue(priorityQueue, {
                    index,
                    prevNodeIndex: -1,
                    totalValue,
                    totalWeight
                })
            }
        }

        return priorityQueue
    }

    getShortestRoute(srcNode, destNode) {
        // Possibly implement some validation of the destination node so that whatever is navigating the network can actually get there
        const aList = this.adjacencyList

        let checkedNodes = []
        let priorityQueue = []

        if (!this._checkLineOfSight(srcNode, destNode)) priorityQueue = this._initPriorityQueue(srcNode, destNode)

        let dest = {
            node: destNode,
            totalWeight: -1,
            prevNodeIndex: -1
        }

        let breakCounter = 10000
        let currNode

        while (priorityQueue.length) {
            if (breakCounter-- <= 0) throw new Error('Reactor overloaded')

            currNode = priorityQueue.shift()
            const canSeeDest = this._checkLineOfSight(destNode, aList[currNode.index].node)

            if (dest.totalWeight >= 0 && dest.totalWeight <= currNode.totalValue) break

            for (let edge of aList[currNode.index].edges) {
                // checks if the edge isn't already in checkedNodes
                if (checkedNodes.some(node => node.index === edge)) continue

                // A* calculations
                const hierarchicalValue = destNode.getDistance(aList[edge].node)
                const totalWeight = aList[currNode.index].node.getDistance(aList[edge].node) + currNode.totalWeight
                const totalValue = hierarchicalValue + totalWeight

                // Updating the dest special case since it's not part of aList
                if (canSeeDest) {
                    const dist = destNode.getDistance(aList[currNode.index].node)
                    if (dest.totalWeight < 0 || dist < dest.totalWeight) {
                        dest.totalWeight = dist
                        dest.prevNodeIndex = currNode.index
                    }
                }

                // Checking if the edge is already in the priorityQueue and removing and re-adding it to the priority queue if it's totalValue is less than the calculated totalValue
                const priorityEdgeIndex = priorityQueue.findIndex(el => el.index === edge)

                if (priorityEdgeIndex > -1) {
                    const priorityEdge = priorityQueue[priorityEdgeIndex]

                    if (priorityEdge.totalValue <= totalValue) continue

                    priorityQueue.splice(priorityEdgeIndex, 1)
                }

                this._addToPriorityQueue(priorityQueue, {
                    index: edge,
                    prevNodeIndex: currNode.index,
                    totalValue,
                    totalWeight
                })
            }

            checkedNodes.push(currNode)
        }

        // Backtracking over the checkedNodes to figure out what was the fastest route
        let fastestRoute = [destNode.pos]
        let lastIndex = dest.prevNodeIndex

        while (lastIndex >= 0) {
            fastestRoute.unshift(this.adjacencyList[lastIndex].node.pos)
            lastIndex = checkedNodes.find(el => el.index === lastIndex).prevNodeIndex
        }
        fastestRoute.unshift(srcNode.pos)

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
