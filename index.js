// spritesheet for all images

import Engine from './src/Engine'
import Villager from './src/Villager'
import Building from './src/Building'
import Point from './src/Point'

function load_assets() {
    let assets = {}

    const assetDiv = document.getElementById('assets')
    for (let i=0; i < assetDiv.children.length; i++) {
        let currNode = assetDiv.children[i]
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

const game = new Engine(canvas, ctx)

const v = new Villager(700, 400)
const b1 = new Building(50, 50, 30, 25)
const b2 = new Building(200, 400, 20, 40)

const nodes = b1.getNodes(v.hitbox)
console.log(nodes)
const n = nodes[3].pos

const VTR = new Point(v.x + v.width / 2, v.y - v.height / 2)
const VBL = new Point(v.x - v.width / 2, v.y + v.height / 2)
const NTR = new Point(n.x + v.width / 2, n.y - v.height / 2)
const NBL = new Point(n.x - v.width / 2, n.y + v.height / 2)

const b2v = new Point(0.3, -0.3)

let last_time = performance.now()

function run() {
    game.update()
    game.draw()

    b1.hitbox.draw(ctx)
    b2.hitbox.draw(ctx)
    v.draw(ctx)
    v.hitbox.draw(ctx)
    ctx.fillStyle = 'blue'
    for (let node of nodes) {
        ctx.fillRect(node.pos.x - 8, node.pos.y - 16, 16, 32)
    }
    
    const BTR = new Point(b2.x + b2.width / 2, b2.y - b2.height / 2)
    const BBL = new Point(b2.x - b2.width / 2, b2.y + b2.height / 2)
    b2.pos.add(b2v)

    const gradient = (NTR.y - VTR.y) / (NTR.x - VTR.x)
    
    // y = m * (x - x1) + y1
    const lineBL = BBL.y > gradient * (BBL.x - NTR.x) + NTR.y
    const lineTR = BTR.y < gradient * (BTR.x - NBL.x) + NBL.y

    if (lineTR && lineBL){
        ctx.strokeStyle = 'red'
    } else {
        ctx.strokeStyle = 'lime'
    }

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

    console.log(performance.now() - last_time)
    last_time = performance.now()
    requestAnimationFrame(run)
}

run()
