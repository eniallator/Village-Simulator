import Engine from './src/Engine'

let canvas = document.getElementById('game-canvas')
let ctx = canvas.getContext('2d')
console.log(ctx)
ctx.imageSmoothingEnabled = false

const game = new Engine(canvas, ctx)

function run() {
    game.update()
    game.draw()

    // requestAnimationFrame(run)
}

run()
