class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    add(vectorOrX, y=null) {
        if (vectorOrX instanceof Vector) {
            const vec = vectorOrX
            this.x += vec.x
            this.y += vec.y
        } else if (typeof(vectorOrX) === 'number' && typeof(y) === 'number'){
            this.x += vectorOrX
            this.y += y
        } else {
            console.error('Error Vector.add didn\'t receive the correct arguments')
        }
        return this
    }

    multiply(value) {
        if (typeof(value) === 'number') {
            this.x *= value
            this.y *= value
        } else {
            console.error('Error Vector.multiply didn\'t receive the correct arguments')
        }
        return this
    }

    getNormalised() {
        if (this.x || this.y) {
            const total = this.x + this.y
            return new Vector(this.x / total, this.y / total)
        } else {
            return new Vector()
        }
    }

    getDifference(vector) {
        if (vector instanceof Vector) {
            return new Vector(vector.x - this.x, vector.y - this.y)
        }
    }
}