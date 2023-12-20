
function write(w_text){

    document.getElementById("text").innerText = w_text;

}

function read() {
    return document.getElementById("name").value;
}




function setup(){

    
    var tree = new Arboreal()

    tree.appendChild("Test", 0);

    var data = getData();
    write(data);
    updateData(0);




}

function getData(){
    return "Data from file/data structure";
}

function updateData(up_length){

        var data = read();
        var length = up_length;

        if(data.charAt(data.length - 1) == " "){
            var index = data.length;
            var stripped_string = data.substring(up_length, index);
            length = length + stripped_string.length;
            console.log("Stripped: " + stripped_string);



           
        }
            setTimeout(updateData.bind(null, length), 700);


}


