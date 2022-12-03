LC = require("./LivingCreature")
module.exports = class Lie extends LC {
    constructor(x, y) {
        super(x, y);
        this.energy = 16
        this.multiplay = 0
    }
    getNewCoordinates() {
        this.directions = [
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
    ChooseCell(ch) {
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }
    ChooseMullCell(ch) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var newX = this.directions[i][0];
            var newY = this.directions[i][1];
            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length)
                if (matrix[newY][newX] == ch) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }
    mull() {
        var emptyCells = this.ChooseMullCell(0);
        var newCell = this.random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newSomething = new Lie(newX, newY);
            Something.push(newSomething);
            this.energy = 16;
        }
    }
    die(Y, X) {
        matrix[this.y][this.x] = 0
        for (var i in Something) {
            if (X == Something[i].x && Y == Something[i].y) {
                Something.splice(i, 1);
                break;
            }
        }
    }
    move() {
        this.energy = this.energy - 1
        var emptyCells = this.ChooseCell(5);
        var newCell = this.random(emptyCells);
        if (this.energy > 0) {
            if (emptyCells == 0) {
            }
            if (emptyCells != 0) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = 3
                this.eat(newX, newY)
                matrix[this.y][this.x] = 0
                this.y = newY
                this.x = newX
                this.mull()
            }
        }
        else if (this.energy == 0) {
            this.die(newX, newY)
        }
    }
    eat(newX, newY) {
        for (var i in PredatorArr) {
            if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                this.energy = 17
                break;
            }
        }
    }
}