let mic = new p5.AudioIn();


function setup(){
    mic.start();
    createCanvas(600, 600);
    frameRate(120);
}

function draw(){
    background(0);
    var vol = mic.getLevel();
    //console.log(vol);
    fill(255);
    ellipse(180, 130, 50, 50);
    ellipse(420, 130, 50, 50);
    ellipse(300, 240, 20, 100);
    fill("red");
    ellipse(300, 450, 500, vol * 1900 + 30);
    fill(0);
    ellipse(300, 450, 470, vol * 900 + 15);
    console.log(vol);

}