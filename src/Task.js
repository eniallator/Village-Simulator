class Task {
    constructor(name, action, hitbox) {
        this.name = name
        this.action = action
        this.hitbox = hitbox
        this.data = {}

        return this
    }

    clone() {
        return new Task(this.name, this.action, this.hitbox)
    }
}

export default Task
