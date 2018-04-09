class Village {
    constructor(x, y) {
        this.townCentre = new TownCentre(x, y)
        console.log(this.townCentre.pos)
        this.villagers = []

        for (var i = 0; i < 5; i++) {
            let newVillager = new Villager(Math.random() * 960, Math.random() * 540)
            this.villagers.push(newVillager)
        }
    }

    update() {
        for (let villager of this.villagers)
            villager.moveTo(this.townCentre.pos)
    }

    draw(ctx) {
        for (let villager of this.villagers)
            villager.draw(ctx)
    }
}