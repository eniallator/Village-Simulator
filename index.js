// spritesheet for all images

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

let canvas = document.getElementById('game-canvas')
let ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

game = new Engine(canvas, ctx)

function run() {
    game.update()
    game.render()
}

setInterval(run, 1/30)
// run()

/*
setInterval(drawFunction, timeInMilliseconds)
*/
