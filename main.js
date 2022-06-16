
img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    //loads images

    //'  !=  ' means not equal to
    // i++ means increment will be by 1
    if(status != "")
    {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        //start, end, interval
        //i++= +1
        {
            document.getElementById("status").innerHTML = "Status : Person Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of people detected are : "+ objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

if(objects.length = 0)
{
    document.getElementById("status").innerHTML = "Status: Person not detected";
    song.play();
}

if(objects.length > 0)
{
    document.getElementById("status").innerHTML = "Status: Person detected";
    song.stop();
}
//Cocossd- helps us in Label, confidence, width & height , X & Y coordinates.
//Posenet- 17 different parts of the body.
//Mobilenet- Image Identification.
//p5- image identification; ml5- sound identification
//createCapture- captures live preview of webcam
//window.speechSynthesis- text to speech
//window.webkitSpeechRecognition- speech to text
//glyphicon glyphicon-star: draws a star
//fa fa-envelope- shows a little emoji of envelope
//to find the length of the string (the no. of character in a string): .length()
//to replace the the value of a variable- .replace()
//Object detected from an image is known as static webapp
//If the object detection happens from a Live webcam view, we call it a synamic web app
//COCO SSD- Coco Single Shot MultiBox Detection