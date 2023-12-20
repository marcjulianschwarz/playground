var canvasX = 400;
var canvasY = 400;

var multiplier = canvasX / 6;

var grid = [
    ["", "O", ""],
    ["", "", ""],
    ["", "", "O"]
];


function drawGrid(){

    fill(0);
    strokeWeight(5);
    line(canvasX / 3, 0, canvasX / 3, canvasY);
    line((canvasX / 3) * 2, 0, (canvasX / 3) * 2 , canvasY);

    line(0, canvasY / 3, canvasX, canvasY / 3);
    line(0, (canvasY / 3) * 2, canvasX, (canvasY / 3) * 2);

}

function fillGrid(){
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid.length; j++){
            if(grid[i][j] == "O"){
                fill(255);
                stroke(0)
                translate(multiplier * (j + 1), multiplier * (i + 1));
                circle(0, 0, canvasX / 3 - 20)
            } else {
                
            }
        }
    }
}

function addCircleAt(x, y){

}


function mouseClicked(){

    var x = mouseX;
    var y = mouseY;
    var x32 = (canvasX / 3)*2;
    var y32 = (canvasY / 3)*2;

    if(x < canvasX / 3){
        if(y < canvasY / 3){
            console.log("1");
        }else if(y > y32){
            console.log("7");
        }else{
            console.log("4");
        }
    } else if(x > x32){
        if(y < canvasY / 3){
            console.log("3");
        }else if(y > y32){
            console.log("9");
        }else{
            console.log("6");
        }
    }else {
        if(y < canvasY / 3){
            console.log("2");
        }else if(y > y32){
            console.log("8");
        }else{
            console.log("5");
        }
    }

}

function setup(){
    frameRate(120);
    createCanvas(canvasX, canvasY);
    background(255);
    drawGrid();


}


function draw(){    
    fillGrid();
}