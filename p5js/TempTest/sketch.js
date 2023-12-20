var canvasX = innerWidth;
var canvasY = innerHeight;

const bodyW = 1000;
const bodyH = 500;

const bodyX = canvasX / 2 - (0.5*bodyW);
const bodyY = canvasY / 2 - (0.5*bodyH);




var tempArr = [[0, -10],[100, 0], [300, 5], [350, 18], [500, 25], [3000, 29], [3600, 40]];
const min = -10;
const max = 40;


function temp(data){

    for(var i = 0; i < data.length - 1; i++){
        stroke(255);
        line(data[i][0]/(3600/bodyW) + bodyX , bodyH - ((data[i][1] + (-1*min))*(bodyH/(-1*min+max))) + bodyY, data[i + 1][0]/(3600/bodyW) + bodyX , bodyH - ((data[i + 1][1] + (-1*min))*(bodyH/(-1*min+max))) + bodyY );
    }
}


function setup(){
    frameRate(120);
    createCanvas(canvasX, canvasY);
    background(255);
    fill(0);
    rect(bodyX,bodyY,bodyW, bodyH);
    temp(tempArr);
}


function draw(){    
    
}