class Engine {
    constructor(ctx) {
        this.ctx = ctx
        this.villager = new Villager(50, 50)
    }

    render() {
        this.villager.draw(this.ctx)
    }
}