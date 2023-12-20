var blob;
var blobs = [];
var spikes = [];
var playerR = 50;
var population = 10000;
var populationSpikes = population * 0.001
var populationR = 10;
var worldSize = 4;
var colors = ["blue", "yellow", "red", "orange", "purple"];

function setup(){
    createCanvas(800, 800);
    frameRate(80);
    blob = new Blob(playerR, 0, 0, 255);
    for(var i = 0; i < population; i++){
        var x = random(-width * worldSize, width * worldSize);
        var y = random(-height * worldSize, height * worldSize);
        blobs[i] = new Blob(populationR, x, y, random(colors));
    }
    for(var i = 0; i < populationSpikes; i++){
        var x = random(-width * 3, width * 3);
        var y = random(-height * 3, height * 3);
        spikes[i] = new Blob(30, x, y, "green");
    }
}

function draw(){
    background(0);

    push();
    translate(0, 0);
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text("Masse: " + Math.round(blob.radius ), 120, 50);
    pop();
    
    translate(width / 2 , height / 2 );
    translate(-blob.pos.x, -blob.pos.y);
    for(var i = blobs.length - 1; i >= 0; i--){
        blobs[i].show();
        if(blob.eats(blobs[i])){

            blobs.splice(i, 1);
        }

    }

    for(var i = spikes.length - 1; i >= 0; i--){
        spikes[i].show();
        if(blob.poppedBy(spikes[i])){
            spikes.splice(i, 1);
        }
    }

    if (blob.tooSmall()){
        window.location.reload();
    }
    
    blob.show();
    blob.update();
}