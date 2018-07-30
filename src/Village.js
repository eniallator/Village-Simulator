import VillageCentre from './VillageCentre'
import Villager from './Villager'

class Village {
    constructor(map, x, y) {
        this.villageCentre = new VillageCentre(x, y)
        this.map = map
        this.villagers = []

        this.map.registerObstacle(this.villageCentre)

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
