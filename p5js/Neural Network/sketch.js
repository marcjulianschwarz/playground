


var canvasX = innerWidth;
var canvasY = innerHeight;

let points = [];


function setup(){

    createCanvas(400, 400);
    background(255);

    
for(let i = 0; i < 100; i++){
    points.push(new Point(createVector(Math.floor((Math.random() * 400) + 1), Math.floor((Math.random() * 400) + 1))));
}

let brain = new Perceptron(2);


    for(let i = 0; i < points.length; i++){

        let p = points[i];
        let x = [p.x, p.y]; 
        brain.train(x, p.target);


        p.show();
    }


}


function draw(){    
    
}