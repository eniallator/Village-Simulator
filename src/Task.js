class Task {
    constructor(name, action, hitbox, target=null, active=true) {
        this.name = name
        this.action = action
        this.hitbox = hitbox
        this.target = target
        this.active = active
        
        return this
    }

    clone() {
        return new Task(this.name, this.action, this.hitbox, this.target)
    }
}