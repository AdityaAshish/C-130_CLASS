
song ="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist=0;
scoreLeftWrist=0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("FF0000");
    stroke("FF0000");

    circle(rightWristX, rightWristY, 20);

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY)
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML =  "Volume = " + volume;
        song.setVolume(volume);
    
    }
    
    if (scoreRightWrist > 0.2) {
    if(rightWristX > 0 && rightWristY<=100)
    {
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
      song.rate(0.5);
    }

    if(rightWristX > 100 && rightWristY<=200)
    {
      document.getElementById("speed").innerHTML = "Speed = 1x";
      song.rate(1);
    }

    if(rightWristX > 200 && rightWristY<=300)
    {
      document.getElementById("speed").innerHTML = "Speed = 1.5x";
      song.rate(1.5);
    }

    if(rightWristX > 300 && rightWristY<=400)
    {
      document.getElementById("speed").innerHTML = "Speed = 2.0x";
      song.rate(2);
    }

    
    if(rightWristX > 400 && rightWristY<=500)
    {
      document.getElementById("speed").innerHTML = "Speed = 2.5x";
      song.rate(2.5);
    }
}






}

function play() {
    song.play();
    song.setvolume(1);
    song.rate(1)
}

function modelLoaded() {
    console.log("PoseNet Model Loaded")
}

function gotPoses(results) {
if(results.length > 0) 
{
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("LeftWristScore= "+scoreLeftWrist + "RighttWristScore= "+scoreRightWrist);


leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.rightWrist.y;
console.log("Left wrist X = " + leftWristX +"Left wrist Y ="+leftWristY )

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("Right wrist X = " + rightWristX +"Right wrist Y ="+rightWristY )
}
}