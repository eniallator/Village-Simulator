class Engine {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.villager = new Villager(50, 50)
        this.dest = new Vector(800, 300)
    }

    update() {
        this.villager.moveTo(this.dest)
    }

    render() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.villager.draw(this.ctx)
    }
}