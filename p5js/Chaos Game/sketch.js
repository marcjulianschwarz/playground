var canvasX = innerWidth;
var canvasY = innerHeight;



var a, b, c;
var x;


function setup(){
    frameRate(60);
    createCanvas(canvasX, canvasY);
    background(0);


    a = createVector(canvasX / 2, 0, 0);
    b = createVector(0, canvasY, 0);
    c = createVector(canvasX, canvasY, 0);
    d = createVector(0, 0);

    point(a.x, a.y);
    point(b.x, b.y);
    point(c.x, c.y);


}


function draw(){    
    
    strokeWeight(1);


    
   // console.log(x);

   for(var i = 0; i < 100; i++){
    x = Math.floor(Math.random() * 3) + 1  ;
    stroke(255, i, 0);
    point(d.x, d.y);

    if(x == 1){

        d.lerp(a.x, a.y,0, 0.5);

    } else if(x == 2){
        d.lerp(b.x, b.y,0, 0.5);
    }else {
        d.lerp(c.x, c.y,0, 0.5);
    }
}


}