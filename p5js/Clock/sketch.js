var canvasX = 400;
var canvasY = 400;

function setup(){

    angleMode(DEGREES);
    createCanvas(canvasX, canvasY);
    frameRate(2);

}

function draw(){

    background(0);
    var hr = hour();
    var min = minute();
    var sec = second();


    translate(canvasX / 2, canvasY / 2);
    rotate(-90);
// Outer Ring
    noFill()
    stroke(255);
    strokeWeight(4);
    ellipse(0, 0, 250, 250);
// Seconds Line    
    push();
    rotate(6 * sec);
    strokeWeight(2);
    stroke(192, 57, 43);
    line(0, 0, 110, 0);
// The ball
    push();
    translate(110, 0);
    rotate(6 * sec * -1);
    noStroke();
    fill(155);
    arc(0, 0, 20, 20, 90, 270, OPEN);
    noStroke();
    fill(255);
    arc(0, 0, 20, 20, 270, 90, OPEN);    
    pop();
    pop();
// Minutes Line
    push();
    rotate(6 * min);
    strokeWeight(8);
    stroke(243, 156, 18);
    line(0, 0, 110, 0);
    pop();
// Hour Line
    push();
    rotate(30 * hr);
    strokeWeight(8);
    stroke(255, 200, 30);
    line(0, 0, 70, 0);
    pop();

//console.log(hr + " " + min + " " + sec);



}