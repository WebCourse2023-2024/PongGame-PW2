function Ball() {
    this.id = "ball";
    this.x = 0;
    this.y = 0;
    this.vx = 5;
    this.vy = 5;
}


function Paddle(paddle_id, left_position, right_position){
    this.id = paddle_id;
    this.left = left_position;
    this.top = 30;
    this.right = right_position;
    this.place_paddle = function (){
        console.log(this.id);
        let paddleElement = document.getElementById(this.id);
        console.log(paddleElement.getBoundingClientRect());
        if (this.id === "left-paddle"){
            paddleElement.style.left = this.left + "px";
        } else {
            paddleElement.style.right = this.right + "px";
        }
        paddleElement.style.top = this.top + "%";

    }
}


function Buttons(){
    this.p1_up = false;
    this.p1_down = false;
    this.p2_up = false;
    this.p2_down = false;
}


let buttons = new Buttons();


function track_player_input(event) {
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
    //console.log(bodyProperties);

    if (ball.x < 0 || ball.x > bodyProperties.width - 60){
        ball.vx *= -1;
    }

    if (ball.y < 0 || ball.y > bodyProperties.height - 63){
        ball.vy *= -1;
    }
}


let ball;
let leftPaddle;
let rightPaddle;


function init() {
    ball = new Ball();
    leftPaddle = new Paddle("left-paddle", 10, 0);
    rightPaddle = new Paddle("right-paddle", 0, 10);

    leftPaddle.place_paddle();
    rightPaddle.place_paddle();

    setInterval(update, 100);
    //update();
}


// Ensure the DOM is fully loaded before initializing
document.addEventListener("DOMContentLoaded", function () {
   init() // Call init function to start the animation
});
