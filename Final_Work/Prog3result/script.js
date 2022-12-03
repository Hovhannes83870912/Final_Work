var side = 60
var socket = io()
var p = document.getElementById('grassCount');
var p2 = document.getElementById('grassEaterCount');
var p3 = document.getElementById('Pradator');
var p4 = document.getElementById('Something');
var button = document.getElementById("BombFall")

function setup() {
    socket.on('MatrixSize', MatrixSize => {
        createCanvas(MatrixSize * side, MatrixSize * side)
        background('#acacac');
    })
}
var explore = 0
function draw() {
    button.onclick = function exlores() {
        console.log(explore)
        socket.emit("explore",explore);
    }
    socket.on('grassCount', grassCount => { 
        p.innerHTML = "Grass count " +  grassCount
    })
    socket.on('grassEaterCount', grassEaterCount => { 
        p2.innerHTML = "grass eater count " +  grassEaterCount
    })
    socket.on('PredatorCount', PredatorCount => { 
        p3.innerHTML = "Predator count " +  PredatorCount
    })
    socket.on('somethingCount', somethingCount => { 
        p4.innerHTML = "Something count " +  somethingCount
    })
    socket.on('message', function (matrix) {
        for (y = 0; y < matrix.length; y++) {
            for (x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                    fill("green");
                    rect(x * side, y * side, side, side);
    
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 3) {
                    fill("#00ab41");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 5) {
                    fill("orange");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 8) {
                    fill("#000");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                    rect(x * side, y * side, side, side);
                }
            }
        }
    })
}





