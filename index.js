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
console.log(ctx)
ctx.imageSmoothingEnabled = false

game = new Engine(canvas, ctx)

b1 = new Building(50, 50, 30, 25)
b2 = new Building(400, 200, 20, 40)
v = new Villager(700, 400)

BTR = new Point(b1.x + b1.width / 2, b1.y - b1.height / 2)
BBL = new Point(b1.x - b1.width / 2, b1.y + b1.height / 2)
VTR = new Point(v.x + v.width / 2, v.y - v.height / 2)
VBL = new Point(v.x - v.width / 2, v.y + v.height / 2)

function run() {
    game.update()
    game.draw()
    b1.hitbox.draw()
    b2.hitbox.draw()
    v.draw(ctx)
    v.hitbox.draw()
    
    ctx.beginPath()
    ctx.moveTo(VTR.x, VTR.y)
    ctx.lineTo(BTR.x, BTR.y)
    ctx.closePath()
    ctx.strokeStyle = 'lime'
    ctx.stroke()
    ctx.strokeStyle = 'black'

    ctx.beginPath()
    ctx.moveTo(VBL.x, VBL.y)
    ctx.lineTo(BBL.x, BBL.y)
    ctx.closePath()
    ctx.strokeStyle = 'lime'
    ctx.stroke()
    ctx.strokeStyle = 'black'
}

setInterval(run, 1/30)
// run()

/*
setInterval(drawFunction, timeInMilliseconds)
*/
