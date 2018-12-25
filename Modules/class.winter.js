/*var LivingCreature = require("./class.livingcreature");
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 0;
        this.acted = false;
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

    chooseCell(num, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(num, matrix);
    }

    color(matrix) {
        var newCell = randomInRange(this.chooseCell(1, matrix));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Winter(newX, newY, 8);

        }
    }

    change(matrix) {
        if (this.acted == false) {
            var newCell = randomInRange(this.chooseCell(1, matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 8;

                this.x = newX;
                this.y = newY;

                this.energy++;
                this.acted = true;


                if (this.energy >= 12) {
                    this.color(matrix);
                    this.energy = 6;
                }

            }
           
        }
        else this.acted = false;
    }
}*/