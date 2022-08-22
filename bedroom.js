image = "";
status_ = "";
object = [];

function preload() {
    img = loadImage('bedroom.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(320, 220);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innnerText = "Status: Detecting Objects"; 
}

function modelLoaded(){
    console.log("Model is Loaded")
    status_ = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else
        console.log(results);
        object = results;
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status_ != ""){
        for (i = 0; i < object.length; i++){
        fill("#E12D2E");
        percentage = floor(object[i].confidence * 100)
        text(object[i].label + " " + percentage + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke("#E12D2E");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        document.getElementById("status").innerHTML = "Status: Object Detected"; 
        }
    }
}