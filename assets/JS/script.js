// Canvas setup
const canvas = document.getElementById('canvasOne');
const contxt = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
contxt.font = '50px Georgia';

// Mouse interactivity
let canvasPlacement = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPlacement.left;
    mouse.y = event.y - canvasPlacement.top;
});
canvas.addEventListener('mouseup', function(){
    mouse.click = false;
})

// Player
class player {
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 573;
        this.spriteHeight = 815;
    }
    update() {
        const distanceX = this.x - mouse.x;
        const distanceY = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= distanceX/30;
        }
        if (mouse.y != this.y) {
            this.y -= distanceY/30;
        }
    }
    draw(){
        if (mouse.click) {
            contxt.lineWidth = 0.2;
            contxt.beginPath();
            contxt.moveTo(this.x, this.y);
            contxt.lineTo(mouse.x, mouse.y);
            contxt.stroke();
        }
        contxt.fillStyle = 'red';
        contxt.beginPath();
        contxt.arc(this.x, this.y, this.radius, 0, math.PI * 2);
        contxt.fill();
        contxt.closePath();
    }
}
const player = new player();

// popping bubbles


// Animation loop
function animate(){
    player.update();
    player.draw();
    requestAnimationFrame(animate);
}
animate()