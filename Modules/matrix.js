var Grass = require("./class.grass");
var GrassEater = require("./class.eatgrass");
var Predator = require("./class.predator");
var Fly = require("./class.fly");
var Spider = require("./class.spider");

Grass.born = 0;
Grass.die = 0;
Grass.current = 0;

GrassEater.born = 0;
GrassEater.die = 0;
GrassEater.current = 0;

Predator.born = 0;
Predator.die = 0;
Predator.current = 0;

Fly.born = 0;
Fly.die = 0;
Fly.current = 0;

Spider.born = 0;
Spider.die = 0;
Spider.current = 0;

var matrix = [];
var n = 50;
var m = 50;

for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        matrix[y][x] = randomItemFromArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4]);
    }
    // console.log(matrix[y]);
}

matrix[Math.floor(randomInRange(matrix.length))][Math.floor(randomInRange(matrix[0].length))] = 5;
matrix[Math.floor(randomInRange(matrix.length))][Math.floor(randomInRange(matrix[0].length))] = 5;
matrix[Math.floor(randomInRange(matrix.length))][Math.floor(randomInRange(matrix[0].length))] = 5;

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            matrix[y][x] = new Grass(x, y, 1);

            Grass.born++;
            Grass.current++;
        }
        else if (matrix[y][x] == 2) {
            matrix[y][x] = new GrassEater(x, y, 2);

            GrassEater.born++;
            GrassEater.current++;
        }
        else if (matrix[y][x] == 3) {
            matrix[y][x] = new Predator(x, y, 3);

            Predator.born++;
            Predator.current++;
        }
        else if (matrix[y][x] == 4) {
            matrix[y][x] = new Fly(x, y, 4);

            Fly.born++;
            Fly.current++;
        }
        else if (matrix[y][x] == 5) {
            matrix[y][x] = new Spider(x, y, 5);
            matrix[y][x].nerkel(matrix);
            
            Spider.born++;
            Spider.current++;
        }

    }
}

function randomItemFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randomInRange(num) {
    return Math.floor(Math.random() * num);
}

module.exports = matrix;