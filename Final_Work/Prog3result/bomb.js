module.exports = class Bomb {
    constructor(x, y) {
        this.time = 0
        this.x = x
        this.y = y
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell() {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var newX = this.directions[i][0];
            var newY = this.directions[i][1];
            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length) {
                found.push(this.directions[i]);

            }
        }
        return found;
    }
    random(min, max) {
        return Math.random() * (max - min) + min;
    }
    fall() {
        this.time++
        if (this.time == 5) {
            let x = Math.floor(this.random(0,matrix.length));
            let y = Math.floor(this.random(0,matrix.length));
            matrix[x][y] = 8
            this.x = x
            this.y = y
            this.explore()
            this.hide()
            this.time = 0
        }
        else if (this.time == 1) {
            this.hideAfterKilling()
        }
    }
    explore() {
        var diametr = this.chooseCell()
        for (let i in diametr) {
            matrix[diametr[i][0]][diametr[i][1]] = 8
        }
    }
    hide() {
        var diametr = this.chooseCell()
        for (let i in diametr) {
            matrix[diametr[i][0]][diametr[i][1]] = 8
            for (var j in grasses) {
                if (diametr[i][1] == grasses[j].x && diametr[i][0] == grasses[j].y) {
                    grasses.splice(j, 1);
                    matrix[diametr[i][0]][diametr[i][1]] = 8
                    break
                }
            }
            for (var j in grassEaterArr) {
                if (diametr[i][1] == grassEaterArr[j].x && diametr[i][0] == grassEaterArr[j].y) {
                    grassEaterArr.splice(j, 1);
                    matrix[diametr[i][0]][diametr[i][1]] = 8
                    break
                }
            }
            for (var j in Something) {
                if (diametr[i][1] == Something[j].x && diametr[i][0] == Something[j].y) {
                    Something.splice(j, 1);
                    matrix[diametr[i][0]][diametr[i][1]] = 8
                    break
                }
            }
            for (var j in PredatorArr) {
                if (diametr[i][1] == PredatorArr[j].x && diametr[i][0] == PredatorArr[j].y) {
                    PredatorArr.splice(j, 1);
                    matrix[diametr[i][0]][diametr[i][1]] = 8
                    break
                }
            }
        }
    }
    hideAfterKilling() {
        var diametr = this.chooseCell()
        for (let i in diametr) {
            matrix[diametr[i][0]][diametr[i][1]] = 0
        }
    }
}
