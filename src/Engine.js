import Map from './Map'
import Point from './Point'

class Engine {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx

        this.map = new Map(new Point(canvas.width, canvas.height))
    }

    update() {
        this.map.update()
    }

    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = 'black'
        this.ctx.strokeStyle = 'black'

        this.map.draw(this.ctx)
    }
}

export default Engine