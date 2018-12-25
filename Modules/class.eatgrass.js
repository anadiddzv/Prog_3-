var LivingCreature = require("./class.livingcreature");
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
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

    move(matrix) {
        if (this.acted == false) {
            var newCell = randomInRange(this.chooseCell(0, matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.acted = true;
            }

            this.energy--;
            if (this.energy <= 0) {
                this.die(matrix);
            }
        }
        else this.acted = false;
    }

    mul(matrix) {
        var newCell = randomInRange(this.chooseCell(0, matrix));
        if (newCell) {

            GrassEater.born++;
            GrassEater.current++;

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new GrassEater(newX, newY, 2);

        }
    }

    eat(matrix) {
        if (this.acted == false) {
            var newCell = randomInRange(this.chooseCell(1, matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX].die();

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy++;
                this.acted = true;


                if (this.energy >= 12) {
                    this.mul(matrix);
                    this.energy = 6;
                }

            }
            else {
                this.move(matrix);
            }
        }
        else this.acted = false;
    }

    die(matrix) {
        this.dieCounter();
        matrix[this.y][this.x] = 0;

    }
    dieCounter(){
        GrassEater.die++;
        GrassEater.current--;
    }
}

function randomInRange( arr )
{
    return arr[Math.floor(Math.random() * arr.length)];
}