class Engine {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.village = new Village(this.canvas.width / 2, this.canvas.height / 2)
    }

    update() {
        this.village.update()
    }

    render() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.village.draw(this.ctx)
    }
}