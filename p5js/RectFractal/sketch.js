var canvasX = innerWidth;
var canvasY = innerHeight;
var resolution = 0;

function setup(){
    createCanvas(canvasX, canvasY);
}

function draw(){

    background(0);
    var z = canvasX / resolution;
    
    for (var x = 0; x < canvasX; x += z){
        for(var y = 0; y < canvasY; y += z){
            fill(255);
            noStroke();
            rect(x, y, z - 1, z - 1);
        }
    }
    resolution += 0.1;
}