var canvasX = 1300;
var canvasY = 1100;
var radius = 300;
var cl = 0;


function setup(){
    colorMode(HSB);
    createCanvas(canvasX, canvasY);
    background(0);
    frameRate();
    translate(canvasX / 2, canvasY / 3.6);
    circle(0,0,radius);
    
}

function circle(x, y, r){
    cl = cl + 0.009;
    noFill();
    strokeWeight(1);
    stroke(cl, 255, 255);

    ellipse(x, y, r, r);

        if (r > 1){
            
            circle(x + r*0.75, y, r/2);
            circle((x + r*0.75) * -1, y, r/2);
            circle(x , y + r+0.75, r/2);
            //circle(x, (y + r*0.75)*-1, r/2);
            
        }

    
    

}