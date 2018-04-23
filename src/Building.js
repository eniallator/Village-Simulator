class Building extends Entity {
    getNodes(hitbox) {
        let nodes = []
        for (let xDir = -1; xDir <= 1; xDir += 2) {
            for (let yDir = -1; yDir <= 1; yDir += 2) {
                let pos = new Point(
                    this.pos.x + xDir * (this.width / 2 + hitbox.width / 2),
                    this.pos.y + yDir * (this.height / 2 + hitbox.height / 2)
                )

                nodes.push({pos: pos, objectRef: this})
            }
        }
        return nodes
    }
}