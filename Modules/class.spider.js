var  LivingCreature = require("./class.livingcreature");
module.exports = class Spider extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [
            [this.x, this.y - 5],
            [this.x - 1, this.y - 4],
            [this.x + 1, this.y - 4],
            [this.x - 2, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 2, this.y - 3],
            [this.x - 3, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 3, this.y - 2],
            [this.x - 4, this.y - 1],
            [this.x - 2, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x + 4, this.y - 1],
            [this.x - 5, this.y],
            [this.x - 3, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 3, this.y],
            [this.x + 5, this.y],
            [this.x - 4, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 4, this.y + 1],
            [this.x - 3, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 3, this.y + 2],
            [this.x - 2, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 2, this.y + 3],
            [this.x - 1, this.y + 4],
            [this.x + 1, this.y + 4],
            [this.x, this.y + 5],
        ];
    }
    chooseCell(num, matrix) {
        return super.chooseCell(num, matrix);
    }
    nerkel(matrix){
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                Spider.born++;
                Spider.current++;

                matrix[y][x] = 7;

            }
        }
        
    }
    // die(){
    //     Grass.die++;
    //     Grass.current--;
    // }
    eat(matrix) {
        var newCell = randomInRange(this.chooseCell(4, matrix));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX].die(matrix);

            matrix[newY][newX] = 0;

            // console.log("eat");

        }
    }

    // die(){
    //     Grass.die++;
    //     Grass.current--;
    // }
}

function randomInRange( arr )
{
    return arr[Math.floor(Math.random() * arr.length)];
}