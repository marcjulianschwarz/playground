let canvasX = 500;
let canvasY = 500;
var x = 1;

function setup(){
    createCanvas(canvasX, canvasY);
    frameRate(30);
    angleMode(DEGREES);
}

function draw(){
    background(0);
    noStroke();

    x = x+3;

    push();
    translate(canvasX / 2, canvasY / 2);
    fill("yellow");
    ellipse(0, 0, 100, 100);

    fill(255, 0, 0);
    rotate(x);
    ellipse(100, 100, 50, 50);

    push();
    fill(0, 255, 0);
    translate(100, 100);
    rotate(x * -3);
    ellipse(40, 40, 20, 20);

    push();
    fill(0, 0, 255);
    translate(40, 40);
    rotate(x * 8);
    ellipse(15, 15, 10, 10);
    

    pop();
    pop();
    pop();
    

}