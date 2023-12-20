var canvasX = 700;
var canvasY = 300;

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
// Mapping time to width
    let x = map(sec, 0, 60, 0, 600);
    let y = map(min, 0, 60, 0, 600);
    let z = map(hr % 12, 0, 12, 0, 600);
// Drawing the rectangles
    noStroke();
    fill(192, 57, 43);
    rect(50, canvasY / 2 + 40 - 25,x + 1 , 40);
    fill(243, 156, 18);
    rect(50, canvasY / 2 - 25, y + 1, 40);
    fill(255, 200, 30);
    rect(50,canvasY / 2 - 40 - 25, z + 1, 40);

// console.log(hr + " " + min + " " + sec);



}