// Canvas setup
const canvas = document.getElementById(canvasOne);
const contxt = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
contxt.font = '50px Georgia';

// Mouse interactivity
let canvasPlacement = canvas.getBoundingClientRect();
console.log(canvasPlacement);
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

});
// Player
// popping bubbles
// Animation loop