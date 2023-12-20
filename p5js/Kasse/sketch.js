
var kasse = 1.20;

function setup(){
    document.getElementById("money").innerHTML = kasse.toString();
}

function update(x, y){
    if(y){
        kasse = kasse + x
        document.getElementById("money").innerHTML = kasse.toString();
    }else{
        kasse = kasse - x
        document.getElementById("money").innerHTML = kasse.toString();
    }
}

function einzahlen(){
    var x = prompt("Wie viel Geld willst du in die Kasse einzahlen?");
    update(parseInt(x), true);
}

function auszahlen(){
    var x = prompt("Wie viel Geld willst du ausgezahlt bekommen?");
    update(parseInt(x));
}