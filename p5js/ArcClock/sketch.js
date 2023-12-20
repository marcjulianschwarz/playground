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
// Mapping time to ellipse
    let xA = map(sec, 0 , 60, 0, 360);
    let yA = map(min, 0, 60, 0, 360);
    let zA = map(hr % 12, 0, 12, 0, 360);

    translate(canvasX / 2, canvasY / 2);
    rotate(-90);
// Seconds Ring
    noFill();
    stroke(192, 57, 43);
    strokeWeight(8);
    arc(0, 0, 300, 300 , 0, xA + 1, false);
// Minutes Ring
    noFill();
    stroke(243, 156, 18);
    strokeWeight(8);
    arc(0, 0, 280, 280 , 0,yA + 1, false);
// Hour ring
    noFill();
    stroke(255, 200, 30);
    strokeWeight(8);
    arc(0, 0, 260, 260 , 0,zA + 1, false);

// console.log(hr + " " + min + " " + sec);



}