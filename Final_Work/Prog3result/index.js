var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
res.redirect('index.html');
});
server.listen(3000);

grasses = [];
grassEaterArr = [];
Something = [];
PredatorArr = [];
BombArr = []

LivingCreature = require('./LivingCreature');
Grass = require('./grass');
GrassEater = require('./grassEater');
something = require('./Something');
Predator = require('./Predator');
Bomb = require('./bomb');

matrix = [];
game()

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function matrixGenerator(matrixSize, grassCount, grassEaterCount, somethingCount, predatorCount) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(getRandomArbitrary(0,matrixSize));
        let y = Math.floor(getRandomArbitrary(0,matrixSize));
        matrix[y][x] = 1;
    }
    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(getRandomArbitrary(0,matrixSize));
        let y = Math.floor(getRandomArbitrary(0,matrixSize));
        matrix[y][x] = 2;
    }
    for (let i = 0; i < somethingCount; i++) {
        let x = Math.floor(getRandomArbitrary(0,matrixSize));
        let y = Math.floor(getRandomArbitrary(0,matrixSize));
        matrix[y][x] = 3;
    }
    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(getRandomArbitrary(0,matrixSize));
        let y = Math.floor(getRandomArbitrary(0,matrixSize));
        matrix[y][x] = 5;
    }
}
MatrixSize = 10
matrixGenerator(MatrixSize, 1,0, 0,0)

var grassCount = 0
var grassEaterCount = 0
var PredatorCount = 0
var somethingCount = 0

function checking(){
    grassCount = 0
    grassEaterCount = 0
    PredatorCount = 0
    somethingCount = 0
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
            grassCount++
            }
            if (matrix[y][x] == 2) {
                grassEaterCount++
            }
            if (matrix[y][x] == 5) {
                PredatorCount++
            }
            if (matrix[y][x] == 3) {
                somethingCount++
            }
        }
    }
    io.sockets.emit('grassCount', grassCount)
    io.sockets.emit('grassEaterCount', grassEaterCount)
    io.sockets.emit('PredatorCount', PredatorCount)
    io.sockets.emit('somethingCount', somethingCount)
}

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let grassObject = new Grass(x, y);
            grasses.push(grassObject)
        }
        else if (matrix[y][x] == 2) {
            let grassEaterObject = new GrassEater(x, y);
            grassEaterArr.push(grassEaterObject)
        }
        else if (matrix[y][x] == 3) {
            let newSomething = new something(x, y);
            Something.push(newSomething)
        }
        else if (matrix[y][x] == 5) {
            let newPredator = new Predator(x, y);
            PredatorArr.push(newPredator)
        }
    }
}
var TNT = new Bomb(matrix.length + 1, matrix.length + 1)
BombArr.push(TNT)

io.on('connection', socket => {
    socket.emit('MatrixSize', MatrixSize)
})

function game() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grassObject = new Grass(x, y);
                grasses.push(grassObject)
            }
            else if (matrix[y][x] == 2) {
                let grassEaterObject = new GrassEater(x, y);
                grassEaterArr.push(grassEaterObject)
            }
            else if (matrix[y][x] == 3) {
                let newSomething = new something(x, y);
                Something.push(newSomething)
            }
            else if (matrix[y][x] == 5) {
                let newPredator = new Predator(x, y);
                PredatorArr.push(newPredator)
            }
        }
    }
}

io.on('connection', socket => {
function work (){
    for (let i in grasses) {
        grasses[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in Something) {
        Something[i].move();
    }
    for (let i in PredatorArr) {
        PredatorArr[i].eat();
    }
    checking()
    io.sockets.emit('message', matrix)
}

socket.on('explore', explore=> {
    if(explore == 0){
        BombArr[0].fall()
    }
})

setInterval(work,1000)
})
