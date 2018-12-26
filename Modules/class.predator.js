var  LivingCreature = require("./class.livingcreature");
module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1]
        ];
    }

    chooseCell(num, matrix) {
        this.getNewCoordinates();

        return super.chooseCell(num, matrix)
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
        }

        if (this.energy <= 0) {
            this.die(matrix);
        }
        else this.acted = false;
        // console.log(this.energy)
    }

    mul(matrix) {
        var newCell = randomInRange(this.chooseCell(0,matrix));

        if (newCell && this.energy >= 8) {
            Predator.born++;
            Predator.current++;
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Predator(newX, newY, 3);
            this.energy = 0;

        }
    }

    eat(m, matrix) {
        var newCell = randomInRange(this.chooseCell(m, matrix));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX].dieCounter();

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy++;


            if (this.energy >= 12) {
                this.mul(matrix);
                this.energy = 3;
            }

        }
        else {
            this.move(matrix);
        }

    }

    die(matrix) {
        this.dieCounter();
        matrix[this.y][this.x] = 0;

    }

    dieCounter(){
        Predator.die++;
        Predator.current--;
    }
}

function randomInRange( arr )
{
    return arr[Math.floor(Math.random() * arr.length)];
}