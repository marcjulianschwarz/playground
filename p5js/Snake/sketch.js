
let size = 400;
let el_size = 20;
let snake_l = 2;
var snake = [[5, 3], [4, 3], [3, 3]];
var food_pos = [[2, 3],[4, 5], [7, 8]];
var k = "left";
let grid = [[]];


function resetGrid(){
    grid = [[]];
    for(var i = 0; i < size/el_size; i++){
       grid.push([]);
    }

    for(var i = 0; i < size/el_size; i++){
      for(var j = 0; j < size/el_size; j++){
           grid[i].push("off");
       }
    }
}

function drawFood(){
    for(var i = 0; i < food_pos.length; i++){
        fill(255, 0, 0);
        rect(food_pos[i][0]*el_size, food_pos[i][1]*el_size, el_size - 1, el_size - 1)
    }
}

function drawGrid(){
    grid.forEach(function (x, i){
        x.forEach(function(y, j){
            if(y == "off"){
                fill(255);
                rect(i*el_size, j*el_size, el_size - 1, el_size - 1);
            }else{
                fill(0, 255, 0);
                rect(i*el_size, j*el_size, el_size - 1, el_size - 1);
            }

            fill(0);
            textSize(32);
            text(snake_l + 1, 300, 300);

        });
    });
}


function randomFood(){
    var min = 0; 
    var max = size/el_size - 1;  
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    var random2 = Math.floor(Math.random() * (+max - +min)) + +min;
    food_pos.push([random, random2]);
}



function setFirstSnake(){
    for(var i = 0; i <= snake_l; i++){
        grid[snake[i][0]][snake[i][1]] = "on";
    }
}


function move(dir){

    for(var i = 0; i < food_pos.length; i++){

        if(snake[snake_l - 1][0] == food_pos[i][0] && snake[snake_l - 1][1] == food_pos[i][1]){
            snake_l += 1;
            snake.unshift(food_pos[i]);
            food_pos.splice(i, 1);
            randomFood();
        }
    
    }

    var old = [snake[snake_l][0], snake[snake_l][1]];

    if (dir == "up"){
        snake.shift();
        snake.push([old[0], old[1] - 1]);
    } else if(dir == "right"){
        snake.shift();
        snake.push([old[0] + 1, old[1]]);
    }else if(dir == "down"){
        snake.shift();
        snake.push([old[0], old[1] + 1]);
    }else{
        snake.shift();
        snake.push([old[0] - 1, old[1]]);
    }


    resetGrid();
    for(var i = 0; i <= snake_l; i++){
        grid[snake[i][0]][snake[i][1]] = "on";
        drawGrid();
        drawFood();
    }

}

function setup(){
    frameRate(4);
    createCanvas(size, size);
    background(0);
    resetGrid();
    setFirstSnake();
    drawGrid();
    drawFood();
}

function draw(){
    move(k);
}

function keyPressed(){
    if(keyCode == 38){          // UP
        k = "up";
    }else if(keyCode == 40){    //DOWN
        k = "down";
    }else if(keyCode == 37){    //LEFT
        k = "left";
    } else {                    //RIGHT
        k = "right";
    }
}

