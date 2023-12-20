var canvasX = innerWidth;
var canvasY = innerHeight;

var n = 0;
var x = 0;

var a = prompt("a = ");
var b = prompt("b = ");
var c = prompt("c = ");
var d = prompt("d = ");


function drawSinus(){

    noStroke();
    fill(255);

    ellipse(n, a*sin(b*x + c) + d*-1, 10, 10);

    if (n < canvasX + 10){
        n++;
        x = x + 0.05;
    }
}

function setup(){
    frameRate(120);
    createCanvas(canvasX, canvasY);
    background(0);
}


alert("Start?");

function draw(){

    translate(0, canvasY / 2);
    drawSinus();
    
    
}