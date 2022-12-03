LC = require("./LivingCreature")
module.exports = class Grass extends LC {
    random(){

    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var chooseObject = super.random(emptyCells); 
        if (chooseObject && this.multiply >= 1) {
            var newX = chooseObject[0];
            var newY = chooseObject[1];
            matrix[newY][newX] = 1;
            var newGrass = new Grass(newX, newY);
            grasses.push(newGrass);
            this.multiply = 0;
        }
    }
}