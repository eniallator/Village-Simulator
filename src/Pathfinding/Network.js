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

    getShortestRoute(srcNode, destNode) {
        // Possibly implement some validation of the destination node so that whatever is navigating the network can actually get there
        const aList = this.adjacencyList

        let checkedNodes = []
        let priorityQueue = []

        let dest = {
            node: destNode,
            totalWeight: -1,
            prevNodeIndex: -1
        }

        for (let index in aList) {
            const nodeRef = aList[index].node
            if (this._checkLineOfSight(srcNode, nodeRef)) {
                const hierarchicalValue = destNode.getDistance(nodeRef)
                const totalWeight = srcNode.getDistance(nodeRef)
                const totalValue = hierarchicalValue + totalWeight

                let queueIndex = 0

                for (let instance of priorityQueue) {
                    if (instance.totalValue < totalValue) {
                        queueIndex++
                    } else {
                        break
                    }
                }

                priorityQueue.splice(queueIndex, 0, {
                    index,
                    prevNodeIndex: -1,
                    totalValue,
                    totalWeight
                })
            }
        }

        let breakCounter = 10000
        let currNode

        if (!this._checkLineOfSight(srcNode, destNode)) {
            while (priorityQueue.length) {
                if (!breakCounter--) throw new Error('Reactor overloaded')
                currNode = priorityQueue.shift()
                const canSeeDest = this._checkLineOfSight(destNode, aList[currNode.index].node)

                if (dest.totalWeight >= 0 && dest.totalWeight <= currNode.totalValue) break

                for (let edge of aList[currNode.index].edges) {
                    if (checkedNodes.some(node => node.index === edge)) continue

                    const hierarchicalValue = destNode.getDistance(aList[edge].node)
                    const totalWeight = aList[currNode.index].node.getDistance(aList[edge].node) + currNode.totalWeight
                    const totalValue = hierarchicalValue + totalWeight

                    if (canSeeDest) {
                        const dist = destNode.getDistance(aList[currNode.index].node)
                        if (dest.totalWeight < 0 || dist < dest.totalWeight) {
                            dest.totalWeight = dist
                            dest.prevNodeIndex = currNode.index
                        }
                    }

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
                        } else {
                            break
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
        }

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
