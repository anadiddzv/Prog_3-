var express = require('express');
var fs = require('fs');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static("./public"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

var Grass = require("./Modules/class.grass");
var GrassEater = require("./Modules/class.eatgrass");
var Predator = require("./Modules/class.predator");
var Fly = require("./Modules/class.fly");
var Spider = require("./Modules/class.spider");

server.listen(3000);

var matrix = require("./Modules/matrix");

var takt = 0;

// var countStatistics = require("./Modules/statistica");


io.on('connection', function (socket) {
    socket.emit("first matrix", matrix)

    socket.on("send takt", function(takter){
        takt = takter;
    })

    // socket.on("set false", function (arr) {
    //     matrix[arr[0]][arr[1]].acted = false;
    // })

    setInterval(function () {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x].index == 1) {
                    if(takt < 5)
                    {
                        matrix[y][x].mul(matrix);
                    }
                    else if(takt == 10)
                    {
                        takt = 0;
                    }
                }
                else if (matrix[y][x].index == 2) {
                    if(takt < 5)
                    {
                        matrix[y][x].eat(matrix);
                    }
                    else if(takt == 10)
                    {
                        takt = 0;
                    }    
                }
                else if (matrix[y][x].index == 3) {
                    // stat.Predator.born++;
                    if (takt < 5){
                        matrix[y][x].eat(2, matrix);                        
                    }
                    else if (takt < 10){
                        matrix[y][x].eat(4, matrix); 
                    }                  
                }
                if (matrix[y][x].index == 4) {
                        matrix[y][x].move(matrix);
                        // stat.Fly.born++;
                }
                else if (matrix[y][x].index == 5) {
                    matrix[y][x].eat(matrix);
                    // stat.Spider.born++; 
                }
            }
        }

        socket.emit("redraw matrix", matrix);
        takt++;
        // console.log(takt)
    }, time);

    
    setInterval(function () {
        stat = {
            "Grass": {
                "born": Grass.born,
                "die": Grass.die,
                "current": Grass.current
            },
            "GrassEater": {
                "born": GrassEater.born,
                "die": GrassEater.die,
                "current": GrassEater.current
            },
            "Predator": {
                "born": Predator.born,
                "die": Predator.die,
                "current": Predator.current
            },
            "Spider": {
                "born": Spider.born,
                "die": Spider.die,
                "current": Spider.current
            },
            "Fly": {
                "born": Fly.born,
                "die": Fly.die,
                "current": Fly.current
            }
        };
        
        var myJSON = JSON.stringify(stat);
        fs.writeFileSync("statistica.json", myJSON);
        socket.emit("stats", stat);
    },1000);
});

var stat = {
    "Grass": {
        "born": 0,
        "die": 0,
        "current": 0
    },
    "GrassEater": {
        "born": 0,
        "die": 0,
        "current": 0
    },
    "Predator": {
        "born": 0,
        "die": 0,
        "current": 0
    },
    "Spider": {
        "born": 0,
        "die": 0,
        "current": 0
    },
    "Fly": {
        "born": 0,
        "die": 0,
        "current": 0
    }
};


var time = frameRate(1);

function frameRate(frameCount) {
    return 1000 / frameCount;
}

