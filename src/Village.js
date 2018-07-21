import VillageCentre from './VillageCentre'
import Villager from './Villager'
import Task from './task'

class Village {
    constructor(map, x, y) {
        this.villageCentre = new VillageCentre(map, x, y)
        this.map = map
        this.villagers = []

        for (var i = 0; i < 5; i++) {
            let newVillager = new Villager(this.map, Math.random() * 960, Math.random() * 540)
            this.villagers.push(newVillager)
        }
    }

    update() {
        for (let villager of this.villagers) villager.update()
    }

    draw(ctx) {
        for (let villager of this.villagers) villager.draw(ctx)
    }
}

export default Village
