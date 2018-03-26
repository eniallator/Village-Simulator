class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(vector_or_x, y=null) {
        if (vector_or_x instanceof Vector) {
            const vec = vector_or_x
            this.x += vec.x
            this.y += vec.y
        } else if (typeof(vector_or_x) === 'number' && typeof(y) === 'number'){
            this.x += vector_or_x
            this.y += y
        }
    }
}