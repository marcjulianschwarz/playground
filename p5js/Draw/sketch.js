let canvasX = 500;
let canvasY = 500;
var pos;

var angle = 0;

function setup(){
    createCanvas(canvasX, canvasY);
    frameRate(30);
    pos = createVector(50, 0);

}



function draw(){
    background(0);
    noStroke();

    angle += 10;
    translate(canvasX / 2, canvasY / 2);
    fill(255);

    circle(pos.x + sin(angle), pos.y + cos(angle), 30);
    



    

}