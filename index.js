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

v = new Villager(700, 400)
b1 = new Building(50, 50, 30, 25)
b2 = new Building(400, 220, 20, 40)

nodes = b1.getNodes(v.hitbox)
console.log(nodes)
n = nodes[3].pos

VTR = new Point(v.x + v.width / 2, v.y - v.height / 2)
VBL = new Point(v.x - v.width / 2, v.y + v.height / 2)
NTR = new Point(n.x + v.width / 2, n.y - v.height / 2)
NBL = new Point(n.x - v.width / 2, n.y + v.height / 2)

function run() {
    game.update()
    game.draw()

    b1.hitbox.draw(ctx)
    b2.hitbox.draw(ctx)
    v.draw(ctx)
    v.hitbox.draw(ctx)
    ctx.fillStyle = 'red'
    for (node of nodes) {
        ctx.fillRect(node.pos.x - 8, node.pos.y - 16, 16, 32)
    }
    
    BTR = new Point(b2.x + b2.width / 2, b2.y - b2.height / 2)
    BBL = new Point(b2.x - b2.width / 2, b2.y + b2.height / 2)

    gradient = (NTR.y - VTR.y) / (NTR.x - VTR.x)
    
    lineTR = BTR.y > gradient * (BTR.x - NTR.x) + NTR.y
    lineBL = BBL.y < gradient * (BBL.x - NBL.x) + NBL.y

    console.log(gradient * (BBL.x - NTR.x) + NTR.y, BTR.y)
    console.log(gradient * (BTR.x - NBL.x) + NBL.y, BBL.y)

    if (lineTR && lineBL)
        console.log('ermahgerd intersercterd')

    ctx.strokeStyle = 'lime'
    ctx.beginPath()
    ctx.moveTo(VTR.x, VTR.y)
    ctx.lineTo(NTR.x, NTR.y)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(VBL.x, VBL.y)
    ctx.lineTo(NBL.x, NBL.y)
    ctx.closePath()
    ctx.stroke()
}

requestAnimationFrame(run)
