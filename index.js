function load_assets() {
    let assets = {}

    assetDiv = document.getElementById('assets')
    for (let i=0; i < assetDiv.children.length; i++) {
        currNode = assetDiv.children[i]
        if (!assets[currNode.tagName])
            assets[currNode.tagName] = {}

        assets[currNode.tagName][currNode.id] = currNode
    }

    return assets
}

let assets = load_assets()
console.log(assets)

let ctx = document.getElementById('game-canvas').getContext('2d')
ctx.imageSmoothingEnabled = false

ctx.drawImage(assets['IMG']['villager-still'], 50, 50, 32, 96)

/*
setInterval(drawFunction, timeInMilliseconds)
*/
