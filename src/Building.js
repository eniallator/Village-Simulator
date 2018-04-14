class Building extends Entity {
    getNodes() {
        let nodes = []
        for (let xDir = -1; xDir <= 1; xDir += 2) {
            for (let yDir = -1; yDir <= 1; yDir += 2) {
                let direction = new Point(xDir, yDir)
                let corner = new Point(
                    this.pos.x + xDir * this.width / 2,
                    this.pos.y + yDir * this.height / 2
                )
                nodes.push({corner: corner, dir: direction})
            }
        }
        return nodes
    }
}