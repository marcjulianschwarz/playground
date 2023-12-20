var n = 0;
var c = 5;

function setup(){
    createCanvas(400, 400);
    background(0);
    colorMode(HSB);
    angleMode(DEGREES);
    frameRate(60);
}

function draw(){
    var a = n * 137.5;
    var r = c * sqrt(n);

    var x = r * cos(a);
    var y = r * sin(a);
    fill(n % 256, 255, 255);
    noStroke();

    translate(width / 2, height / 2);
    ellipse(x, y, 5, 5);
    n++;
}