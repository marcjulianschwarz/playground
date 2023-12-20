var canvasX = 500;
var canvasY = 500;


function setup(){
    createCanvas(canvasX, canvasY);
    angleMode(DEGREES);
    for(var n = 0; n < 100000; n++){
        console.log(n*sin(180/n));
    }        

}

function draw(){
    background(0);




}
