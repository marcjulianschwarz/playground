function make2DArray(cols, rows){
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

var canvasX = 1000;
var canvasY = 1000;
var res = 10;
var cols = canvasX / res;
var rows = canvasY / res;
var grid;
var generation = 0;

function setup(){
    createCanvas(canvasX, canvasY);
    frameRate(30);
    // Creating Grid //
    grid = make2DArray(cols , rows);
    // Assigning 0 and 1 //
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j] = floor(random(2));
        }
    }    
}

function draw(){
    background(0);
    print(generation);
    // Draw the grid
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x = i * res;
            let y = j * res;
            if(grid[i][j] == 1){
                fill(0, 255 ,0);
                noStroke();
                rect(x, y, res - 1, res - 1);
            }
        }
    }

    var next = make2DArray(cols, rows);

    // Calculate next Grid //
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let state = grid[i][j];

            // Edge case//
            if(i == 0 || i == cols -1 || j == 0 || j == rows - 1){
                next[i][j] = state;
            }else{

            let neigh = countCells(grid, i, j);
            
            // Apply Rules //
            if(state == 0 && neigh == 3){
                next[i][j] = 1;

            } else if(state == 1 && (neigh < 2 || neigh > 3)){
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
        }
    }

    grid = next;

    generation += 1;
}

function countCells(grid, x, y){
    let sum = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            sum += grid[x + i][y + j];
        }
    }
    sum -= grid[x][y];
    return sum;
}
