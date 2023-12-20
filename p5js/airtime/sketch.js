let ms = 14.40;
let os = 11.50;
let f = 2.20;

let x = parseInt(prompt("Mit Socken")); 
let y = parseInt(prompt("Ohne Socken")); 
let all = x + y;
let z = parseInt(prompt("Fahrkarten"));



function getSocks(socks){
    let result = socks * ms;
    return result;
}

function getWithout(people){
    let result = people * os;
    return result;
}

function getTickets(tickets){
    let result = tickets * f;
    return result;
}

let ge = getSocks(x) + getWithout(y) + getTickets(z);

alert("Mit Socken: " + getSocks(x) + " , Ohne Socken: " + getWithout(y) + " , Tickets: " + getTickets(z) + " , Gesamt: " + ge);





