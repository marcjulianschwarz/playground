var ml_data;
var capture;
var cam;

document.addEventListener("DOMContentLoaded", function (event) {

    var status = document.getElementById('status');


    var socket = io.connect('http://localhost:3000');


    socket.on('connect', function () {
        status.innerHTML = 'Connected';
    });


    socket.on('data', function (data) {
        ml_data = data.poses;
        // console.log(JSON.stringify(ml_data));
    });
});


function setup() {
    frameRate(40);
    createCanvas(600, 400);
    cam = prompt("Cam on or off?");
    if(cam == "on"){
        capture = createCapture(VIDEO);
        capture.hide();
    }else{
        background(0);
    }
}


function draw() {
    
    if(cam == "on"){
        push();
        translate(600,0);
        scale(-1.0,1.0);
        image(capture,0,0);
        pop();
    } else{
        background(0);
    }

    try {

        for (var i = 0; i < ml_data.length; i++) {

            var nose = ml_data[i].keypoints[0];

            var eye_l = ml_data[i].keypoints[1];
            var eye_r = ml_data[i].keypoints[2];

            var ear_l = ml_data[i].keypoints[3];
            var ear_r = ml_data[i].keypoints[4];





            if (nose.score > 0.9) {
                fill("white");
                ellipse(nose.position.x, nose.position.y, 20, 50);

                fill("red");
                var avg = (nose.position.x + eye_l.position.x + eye_r.position.x)/3;
                ellipse(avg, nose.position.y + 50, 50, 10);
                console.log(avg + "    " + nose.position.x);
            }
            if (eye_l.score > 0.9) {
                fill("lightblue");
                circle(eye_l.position.x, eye_l.position.y, 30);
            }
            if (eye_r.score > 0.9) {
                fill("lightblue");
                circle(eye_r.position.x, eye_r.position.y, 30);
            }
            if (ear_l.score > 0.5) {
                fill("yellow");
                ellipse(ear_l.position.x, ear_l.position.y, 20, 50);
            }
            if (ear_r.score > 0.5) {
                fill("yellow");
                ellipse(ear_r.position.x, ear_r.position.y, 20, 50);
            }

        }

    } catch{
        status.innerHTML = 'No Faces visible';
    }


}
