function Ball() {
    this.id = "ball";
    this.x = 0;
    this.y = 0;
}

function placeObjects(objects) {
    for (let object of objects) {
        let element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}

function update() {
    ball.x += 5;
    ball.y += 5;
    placeObjects([ball]);
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
