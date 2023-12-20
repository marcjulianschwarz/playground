var y = -350
var x = y;

function setup(){
    createCanvas(800, 800);
    background(0);
    frameRate(120);
}

function draw(){
    noStroke();
    translate(width / 2, height);
    fill(255);
    ellipse(-x, -0.01*x*x, 10, 10);
    fill("yellow");
    ellipse(-x, -0.03*x*x, 10, 10);
    fill("red");
    ellipse(-x, -0.008*x*x, 10, 10);
    fill("blue");
    ellipse(-x, -0.04*x*x, 10, 10);
    ellipse(-x, -0.05*x*x, 10, 10);
    fill("yellow");
    ellipse(-x, -0.009*x*x, 10, 10);
    fill("red");
    ellipse(-x, -0.007*x*x, 10, 10);
    fill("blue");
    ellipse(-x, -0.05*x*x, 10, 10);
    x++;
}