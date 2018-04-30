class Point {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    _operation(value, transform) {
        [this.x, this.y] = transform(value)
    }

    add(pointOrX, y=null) {
        let addition = point => [this.x + point.x, this.y + point.y]

        if (pointOrX instanceof Point) {
            this._operation(pointOrX, addition)
        } else if (typeof(pointOrX) === 'number' && typeof(y) === 'number'){
            this._operation(new Point(pointOrX, y), addition)
        } else {
            console.error('Error Point.add didn\'t receive the correct arguments')
        }
    }

    sub(pointOrX, y = null) {
        let subtraction = point => [this.x - point.x, this.y - point.y]

        if (pointOrX instanceof Point) {
            this._operation(pointOrX, subtraction)
        } else if (typeof (pointOrX) === 'number' && typeof (y) === 'number') {
            this._operation(new Point(pointOrX, y), subtraction)
        } else {
            console.error('Error Point.add didn\'t receive the correct arguments')
        }
    }

    multiply(value) {
        let multiply = value => [this.x * value, this.y * value]

        if (typeof(value) === 'number') {
            this._operation(value, multiply)
        } else {
            console.error('Error Point.multiply didn\'t receive the correct arguments')
        }
    }

    getNormalised() {
        if (this.x || this.y) {
            const total = Math.sqrt(this.x * this.x + this.y * this.y)
            return new Point(this.x / total, this.y / total)
        } else {
            return new Point()
        }
    }

    getDifference(point) {
        if (point instanceof Point) {
            return new Point(point.x - this.x, point.y - this.y)
        }
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

export default Point