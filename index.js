import AssetManager from './src/Assets/AssetManager'
import Engine from './src/Engine'

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

let game
const assetManager = new AssetManager()

function run() {
    game.update()
    game.draw()

    requestAnimationFrame(run)
}

async function initialise() {
    await assetManager.onLoad()
    game = new Engine(canvas, ctx)
    run()
}

initialise()
