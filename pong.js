function Ball() {
    this.id = "ball";
    this.x = 0;
    this.y = 0;
    this.vx = 5;
    this.vy = 5;
}

function placeObjects(objects) {
    for (let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = "" + object.x + "px";
        element.style.top = "" + object.y + "px";
    }
}

function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    placeObjects([ball]);
    ball_bounce(ball);

    // let ballElement = document.getElementById("ball");
    // let ballProperties = ballElement.getBoundingClientRect();
    // //console.log(ballProperties);
    //
    // let leftPaddle = document.getElementById("left-paddle");
    // console.log(leftPaddle.getBoundingClientRect());
    //
    // let rightPaddle = document.getElementById("right-paddle");
    // console.log(rightPaddle.getBoundingClientRect());
}

function ball_bounce(ball){

    let bodyElement = document.querySelector("body");
    let bodyProperties = bodyElement.getBoundingClientRect();
    console.log(bodyProperties);

    if (ball.x < 0 || ball.x > bodyProperties.width){
        ball.vx *= -1;
    }

    if (ball.y < 0 || ball.y > bodyProperties.height){
        ball.vy *= -1;
    }
}

let ball;

function init() {
    ball = new Ball();

    // Ensure the DOM is fully loaded before initializing
    document.addEventListener("DOMContentLoaded", function () {
        setInterval(update, 100);
    });
}

init(); // Call init function to start the animation
