class Task {
    constructor(name, action, hitbox, target=null) {
        this.name = name
        this.action = action
        this.hitbox = hitbox
        this.target = target
        
        return this
    }

    clone() {
        return new Task(this.name, this.action, this.hitbox, this.target)
    }
}