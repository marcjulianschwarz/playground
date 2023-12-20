function setup(){
    createCanvas(500, 500);
}

function draw(){
    background(0);
    fill(255);
    textSize(70);
    textAlign(CENTER);
    let sec = second();
    let min = minute();
    let hr = hour();
    let time = hr + "  " + min + "  " + sec;
    text(time, 250, 260);
}