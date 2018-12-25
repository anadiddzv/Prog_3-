var matrix = [];
var socket;
var stat;
var side = 15;

function setup() {
    background("gray");
    frameRate(0);

    socket = io();

    socket.on("first matrix", function (mtx) {
        matrix = mtx;
        createCanvas(1800, 751);
        background("gray");
        redraw();

        socket.on("redraw matrix", function (mtx) {
            matrix = mtx;
            redraw();
        });
        socket.on("stats", function (stats) {
            stat = stats;
        });
    });

    noLoop();
}

function draw() {
    background('gray');
    for (var yCord = 50; yCord <= 7950; yCord += 100) {
        for (var xCord = 50; xCord <= 950; xCord += 100) {
            line(1800, yCord, xCord, yCord)
        }
    }

    var yText = 0;
    for (var i in stat) {

        var xText = 0;

        if (i == "Grass") {
            fill("green")
        }
        else if (i == "GrassEater") {
            fill("yellow")
        }
        else if (i == "Predator") {
            fill("red")
        }
        else if (i == "Spider") {
            fill("#636363")
        }
        else if (i == "Fly") {
            fill("black")
        }
        textSize(35)
        text(i, 800, 250 + yText);

        for(var j in stat[i]){
            text(stat[i][j], 1000 + xText, 250 + yText)
            xText +=300;
        }
        yText += 100;
    }

    textSize(40);
    fill("black");
    text("Game of life", 1010, 50);
    line(1000, 50, 1000, 750);
    line(1230, 50, 1230, 750);
    line(1560, 50, 1560, 750);
    textSize(35);
    fill("black");
    text("Name", 800, 150);
    text("Born", 1060, 150);
    text("Die", 1350, 150);
    text("Current", 1600, 150);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];

            if (obj.index == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (obj.index == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
                // socket.emit("set false", [y, x]);
                //matrix[y][x].acted = false;
            }
            else if (obj.index == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
                // socket.emit("set false", [y, x]);
                //matrix[y][x].acted = false;
            }
            else if (obj.index == 8) {
                fill("#cc0052");
                rect(x * side, y * side, side, side);
            }
            if (obj.index == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
                // socket.emit("set false", [y, x]);
                //matrix[y][x].acted = false;
            }
            else if (obj.index == 5) {
                fill("#636363");
                rect(x * side, y * side, side, side);
            }
            else if (obj == 7) {
                fill("#45403F");
                rect(x * side, y * side, side, side);
                // socket.emit("set false", [y, x]);
                //matrix[y][x].acted = false;
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

