var LivingCreature = require("./class.livingcreature");
module.exports = class Fly extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.acted = false;
        this.energy = 50;
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
        return super.chooseCell(num, matrix);
    }

    mul(matrix) {
        this.multiply++;
        var newCell = randomInRange(this.chooseCell(0, matrix));

        if (newCell && this.multiply >= 12) {

            var newX = newCell[0];
            var newY = newCell[1];

            Fly.born++;
            Fly.current++;

            matrix[newY][newX] = new Fly(newX, newY, 4);
            this.multiply = 0;
            this.energy = 0;
        }
    }

    move(matrix) {
        if (this.acted == false) {

            var newCell = randomInRange(this.chooseCell(randomInRange([0, 7]), matrix));

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
            }
            this.energy--;
            if (this.energy <= 0) {
                this.die(matrix);
            }

            this.acted = true;
            
        }
        else this.acted = false;
    }
    
    die(matrix) {
        this.dieCounter(matrix);
        matrix[this.y][this.x] = 0;
    }

    dieCounter(){
        Fly.die++;
        Fly.current--;
    }
}
function randomInRange( arr )
{
    return arr[Math.floor(Math.random() * arr.length)];
}