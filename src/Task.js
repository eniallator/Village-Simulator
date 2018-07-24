class Task {
    constructor(name, action, data = {}) {
        this.name = name
        this.action = action
        this.data = data

        return this
    }
}

export default Task
