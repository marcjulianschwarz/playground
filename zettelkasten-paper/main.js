class View{

    constructor(name, x, y){
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = ++current_view_id;
    }
}


class State{
    
    constructor(name, views, pattern){
        this.name = name;
        this.views = views;
        this.pattern = pattern;
    }
}


current_view_id = 5;
current_state = new State("DefaultState", [new View("text", 20, 20)], "grid");



$( function() {
    $( ".view" ).draggable({ containment: ".papier-container", scroll: false, grid: [20, 20] , stack:".view"})

    drawLines(40);
    setup();
    


});

function getCanvasCtx(){
    let paper = document.querySelector(".papier-container");

    let c = document.getElementById("paper-canvas");
    c.style.zIndex = 999;
    c.width = paper.offsetWidth - 40;
    c.height = paper.offsetHeight - 40;
    if (c.getContext) {
        return [c.getContext("2d"), paper, c];
    } else {
        alert("This browser doesnt support canvas.")
    }
}

function drawGrid(){

        localStorage.setItem("pattern", "grid");
        let width = parseInt(document.getElementById("pattern-width").value);
        
        if (width < 3){
            width = 5;
        }
    
        let values = getCanvasCtx();
        let ctx = values[0]; 
        let paper = values[1];
        let canvas = values[2];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i <= paper.offsetWidth - 40; i += width){
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, paper.offsetHeight - 40);
            ctx.stroke()
        }

        for (let j = 0; j < paper.offsetHeight - 40; j += width){

            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(paper.offsetWidth - 40, j);
            ctx.stroke()

        }        
}

function drawLines(){

    localStorage.setItem("pattern", "lines");
    let width = parseInt(document.getElementById("pattern-width").value);
    
    if (width < 3){
        width = 5;
    }

    let values = getCanvasCtx();
    let ctx = values[0]; 
    let paper = values[1];
    let canvas = values[2];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let j = 0; j < paper.offsetHeight - 40; j += width){

        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(paper.offsetWidth - 40, j);
        ctx.stroke()

    }  

}


function setup(){
    let savedStates = JSON.parse(localStorage.getItem("savedStates"));
    if (!savedStates){
        savedStates = [current_state];
        localStorage.setItem("savedStates", JSON.stringify(savedStates));
        
        document.getElementById("state-name").value = current_state.name;
        addSavedStateToList(current_state);

        // create all views in that state
        for (let view of current_state.views){
            let template = document.querySelector("." + view.name + ".template");
            let newView = document.querySelector(".papier-container").appendChild(document.importNode(template, true));
            
            // Remove template class from view to make it visible
            newView.setAttribute("class", "view " + view.name);
            newView.setAttribute("view-id", view.id);
            //console.log("Set "+ view.name + " with id=" + view.id);

            // Make the newly created view draggable so that the state can be udpated by the user
            $( "div[view-id='"+ view.id + "'" ).draggable({ containment: ".papier-container", scroll: false, grid: [20, 20] , stack:".view"})
            
            // Position the view at the correct coordinates 
            setPos(newView, view.x, view.y);
        }
        
    }else {
        
        for (let state of savedStates){
            addSavedStateToList(state);
        }
    }
    
}

function saveCurrentState(){
    let paperRect = document.querySelector(".papier-container").getBoundingClientRect();
    for (let i = 0; i < current_state.views.length; i++){
        let view = current_state.views[i];
        let viewEle = document.querySelector("div[view-id='"+view.id+"']");
        
        // If the element still exists, update its x,y coordinates
        if (viewEle){
            let viewEleRect = viewEle.getBoundingClientRect();
            view.x = viewEleRect.left - paperRect.left;
            view.y = viewEleRect.top - paperRect.top;
        }
        current_state.views[i] = view;
    }

    current_state.name = document.getElementById("state-name").value;
    let savedStates = JSON.parse(localStorage.getItem("savedStates"));

    // If no states have been saved create an empty list that can be filled with new states
    if(!savedStates){
        savedStates = [];
    }

    for(let i = 0; i < savedStates.length; i++){
        let state = savedStates[i];

        // If the current state has been saved before, just update its values
        if (state.name == current_state.name){
            savedStates[i] = current_state;
            localStorage.setItem("savedStates", JSON.stringify(savedStates));
            console.log("Has been saved before");
            return;
        }
    }

    // Here the current state hasnt been found in savedStates thus it will be saved and added to the list
    savedStates.push(current_state);
    localStorage.setItem("savedStates", JSON.stringify(savedStates));
    addSavedStateToList(current_state);
    console.log("Save:");
    console.log(current_state);
}

function addSavedStateToList(state){
    let selectList = document.getElementById("savedStates");
    let option = selectList.appendChild(document.createElement("option", {"value": state.name}));
    option.appendChild(document.createTextNode(current_state.name));
}



function setState(){

    // Remove all views to make room for the new state
    removeAllViews();

    let selectedState = document.getElementById("savedStates").value;

    for (let state of JSON.parse(localStorage.getItem("savedStates"))){
        
        // get the saved state which has been selected
        if (state.name == selectedState){

            // Set the current state to the selected state
            current_state = state;
            document.getElementById("state-name").value = state.name;

            // create all views in that state
            for (let view of state.views){
                let template = document.querySelector("." + view.name + ".template");
                let newView = document.querySelector(".papier-container").appendChild(document.importNode(template, true));
                
                // Remove template class from view to make it visible
                newView.setAttribute("class", "view " + view.name);
                newView.setAttribute("view-id", view.id);
                //console.log("Set "+ view.name + " with id=" + view.id);

                // Make the newly created view draggable so that the state can be udpated by the user
                $( "div[view-id='"+ view.id + "'" ).draggable({ containment: ".papier-container", scroll: false, grid: [20, 20] , stack:".view"})
                
                // Position the view at the correct coordinates 
                setPos(newView, view.x, view.y);
            }
        }
    }
    console.log("Set");
    console.log(current_state);
}


function setPos(ele, x, y, name){
    let paper = document.querySelector(".papier-container");
    if (y + ele.offsetHeight <= paper.offsetHeight && x + ele.offsetWidth <= paper.offsetWidth ){
        // subtracting 1 because views would shift by one pixel on setPos
        ele.style.top = (y-1) + "px";
        ele.style.left = (x-1) + "px";
    } else {
        alert("Values too big for " + name);
    }
}

function removeAllViews(){
    let paper = document.querySelector(".papier-container");
    // make sure no template gets removed
    for (let child of paper.querySelectorAll(".view:not(.template)")){
        paper.removeChild(child);
    }

    // make sure that the views get removed from the current state too and update the name
    current_state.views = [];
    current_state.name = document.getElementById("state-name").value;
}


function addView(){

    let paper = document.querySelector(".papier-container");
    let viewList = document.getElementById("views");

    // Create new view object at origin with the selected name and add it to the current state
    let view = new View(viewList.value, 20, 20);
    current_state.views.push(view);

    // Again create a new view using the template, making it visible by removing the template class
    let template = document.querySelector("." + view.name + ".template");
    let newView = paper.appendChild(document.importNode(template, true));
    newView.setAttribute("view-id", view.id)
    newView.setAttribute("class", "view " + view.name);

    //console.log("Add "+ view.name + " with id=" + view.id);
    newView.style.top = view.y + "px";
    newView.style.left = view.x + "px";

    // make the newly created view draggable
    $( "div[view-id='"+ view.id + "'" ).draggable({ containment: ".papier-container", scroll: false, grid: [20, 20] , stack:".view"})
}


function deleteView(e){
    // delete a specific view
    e.parentNode.parentNode.removeChild(e.parentNode);
    
    // make sure to remove it from the current state too as we dont want to add this to new states
    current_state.views = current_state.views.filter(function(view) {
        return parseInt(view.id) !== parseInt(e.parentNode.getAttribute("view-id"));
    })
}
