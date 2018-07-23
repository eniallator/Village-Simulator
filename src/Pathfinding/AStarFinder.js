function addToPriorityQueue(priorityQueue, item) {
    let queueIndex = 0

    for (let instance of priorityQueue) {
        if (instance.totalValue < item.totalValue) {
            queueIndex++
        } else {
            break
        }
    }

    return [...priorityQueue.slice(0, queueIndex), item, ...priorityQueue.slice(queueIndex)]
}

function initPriorityQueue(srcNode, destNode, aList, checkLineOfSight) {
    return aList.reduce((priorityQueue, { node }, index) => {
        if (checkLineOfSight(srcNode, node)) {
            const totalWeight = srcNode.getDistance(node)

            return addToPriorityQueue(priorityQueue, {
                index,
                prevNodeIndex: -1,
                totalValue: destNode.getDistance(node) + totalWeight,
                totalWeight
            })
        }
        return priorityQueue
    }, [])
}

function aStarFinder(srcNode, destNode, aList, checkLineOfSight) {
    // Possibly implement some validation of the destination node so that whatever is navigating the network can actually get there
    const checkSuccess = (dest, currNode) => dest.totalWeight >= 0 && dest.totalWeight <= currNode.totalValue

    let checkedNodes = []
    let priorityQueue = []

    if (!checkLineOfSight(srcNode, destNode)) priorityQueue = initPriorityQueue(srcNode, destNode, aList, checkLineOfSight)

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
        const canSeeDest = checkLineOfSight(destNode, aList[currNode.index].node)

        if (checkSuccess(dest, currNode)) break

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

            // Checking if the edge is already in the priorityQueue and removing and re-adding it to the priority queue if its totalValue is less than the calculated totalValue
            const priorityEdgeIndex = priorityQueue.findIndex(el => el.index === edge)

            if (priorityEdgeIndex > -1) {
                const priorityEdge = priorityQueue[priorityEdgeIndex]

                if (priorityEdge.totalValue <= totalValue) continue

                priorityQueue.splice(priorityEdgeIndex, 1)
            }

            priorityQueue = addToPriorityQueue(priorityQueue, {
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
        fastestRoute.unshift(aList[lastIndex].node.pos)
        lastIndex = checkedNodes.find(el => el.index === lastIndex).prevNodeIndex
    }
    fastestRoute.unshift(srcNode.pos)

    return fastestRoute
}

export default aStarFinder
