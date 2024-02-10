let paddleMove = 5;
let buttons = new Buttons();
let ball;
let leftPaddle;
let rightPaddle;


function Ball() {
    this.id = "ball";
    this.x = 0;
    this.y = 0;
    this.vx = 10;
    this.vy = 10;
}

function Paddle(paddle_id, left_position, right_position){
    this.id = paddle_id;
    this.left = left_position;
    this.top = 30;
    this.right = right_position;
    this.paddleElement = document.getElementById(this.id);
    this.placePaddle = function (){
        if (this.id === "left-paddle"){
            this.paddleElement.style.left = this.left + "px";
        } else {
            this.paddleElement.style.right = this.right + "px";
        }
        this.paddleElement.style.top = this.top + "%";

    }

    this.movePaddle = () => {
        let body_element = document.querySelector("body");
        let bodyElementHeight = body_element.getBoundingClientRect().height;
        let paddleHeight = this.paddleElement.getBoundingClientRect().height;
        //console.log(body_element.getBoundingClientRect());
        console.log(this.paddleElement.getBoundingClientRect())
        // console.log(this.paddleElement.getBoundingClientRect().height);
        // console.log("p1_up: " + buttons.p1_up + "\n" +
        //             "p1_down: " + buttons.p1_down + "\n" +
        //             "p2_up: " + buttons.p2_up + "\n" +
        //             "p2_down: " + buttons.p2_down + "\n");
        if (this.id === "left-paddle"){
            if (buttons.p1_up && this.top > 0)
                this.top -= paddleMove;

            if (buttons.p1_down &&
                (this.top < 70))
                this.top += paddleMove;

        }

        if (this.id === "right-paddle"){
            if (buttons.p2_up && this.top > 0)
                if (this.id === "right-paddle")
                    this.top -= paddleMove;

            if (buttons.p2_down &&
                (this.top < 70))
                this.top += paddleMove;
        }

        this.placePaddle();
    }
}


function Buttons(){
    this.p1_up = false;
    this.p1_down = false;
    this.p2_up = false;
    this.p2_down = false;
}


function trackPlayerInput(event) {
    if (event.type === "keydown") {
        switch (event.key) {
            case "a":
                buttons.p1_up = true; break;
            case "q":
                buttons.p1_down = true; break;
            case "p":
                buttons.p2_up = true; break;
            case "m":
                buttons.p2_down = true; break;
        }
    } else if (event.type === "keyup") {
        switch (event.key) {
            case "a":
                buttons.p1_up = false; break;
            case "q":
                buttons.p1_down = false; break;
            case "p":
                buttons.p2_up = false; break;
            case "m":
                buttons.p2_down = false; break;
        }
    }
}


function placeObjects(objects) {
    for (let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}


function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    placeObjects([ball]);
    wall_ball_bounce(ball);
    bounceOnPaddle();

    leftPaddle.movePaddle();
    rightPaddle.movePaddle();

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


function wall_ball_bounce(ball){

    let bodyElement = document.querySelector("body");
    let bodyProperties = bodyElement.getBoundingClientRect();
    //console.log(bodyProperties);

    if (ball.x < 0 || ball.x > bodyProperties.width - 60){
        ball.vx *= -1;
    }

    if (ball.y < 0 || ball.y > bodyProperties.height - 63){
        ball.vy *= -1;
    }
}


function bounceOnPaddle(){
    const left = leftPaddle.paddleElement.getBoundingClientRect();
    const right = rightPaddle.paddleElement.getBoundingClientRect();
    const ballElement = document.getElementById(ball.id).getBoundingClientRect();

    if (ball.y > left.y && ball.y - left.y < left.height)
        if (ballElement.left - left.left < left.width)
            ball.vx *= -1;

    if (ball.y - right.y < right.height && ball.y > right.y)
        if (right.left - ballElement.left < ballElement.width)
            ball.vx *= -1
}


function init() {
    ball = new Ball();
    leftPaddle = new Paddle("left-paddle", 10, 0);
    rightPaddle = new Paddle("right-paddle", 0, 10);

    leftPaddle.placePaddle();
    rightPaddle.placePaddle();

    // Set up event listeners for keyboard input
    document.addEventListener("keydown", trackPlayerInput);
    document.addEventListener("keyup", trackPlayerInput);

    setInterval(update, 100);
    //update();
}


// Ensure the DOM is fully loaded before initializing
document.addEventListener("DOMContentLoaded", function () {
   init() // Call init function to start the animation.
});
