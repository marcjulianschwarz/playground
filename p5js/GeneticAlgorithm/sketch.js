var canvasX = 800;
var canvasY = 800;
var botRadius = 20;
var bots = [];
var dnaGene;

function getAim(){
    return createVector(canvasX - 50, canvasY / 2);
}

function getStart(){
    return createVector(50, canvasY / 2);
}


function setup(){
    createCanvas(canvasX, canvasY);
    for(var i = 0; i < 50; i++){
        bots[i] = new Bot(getStart().x, getStart().y, botRadius);
       // console.log(bots[i]);
    }
    dnaGene = new Gene(createVector(getAim().x, getAim().y));
}

function draw(){
    
    background(0);
    fill(255);
    ellipse(getAim().x, getAim().y, 40, 40);
    for(var d = bots.length - 1; d >= 0;d--){
        //bots[d].show();
        //bots[d].moveRand(dnaGene);
        console.log(bots[d]);
    }
}