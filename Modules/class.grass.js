var  LivingCreature = require("./class.livingcreature");
module.exports = class Grass extends LivingCreature{
    mul(matrix) {
        this.multiply++;
        var newCell = randomInRange(this.chooseCell(0, matrix));

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Grass(newX, newY, 1);
            this.multiply = 0;
            Grass.born++;
            Grass.current++;

        }
    }

    die(){
        Grass.die++;
        Grass.current--;
    }
}

function randomInRange( arr )
{
    return arr[Math.floor(Math.random() * arr.length)];
}

