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
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
};
canvas.addEventListener('mousedown', function (event) {
    mouse.click = true;
    mouse.x = event.x - canvasPlacement.left;
    mouse.y = event.y - canvasPlacement.top;
});
canvas.addEventListener('mouseup', function () {
    mouse.click = false;
});

// Player
const alienPlayer = new Image();
alienPlayer.src = 'assets/images/alien.png';

class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
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
            this.x -= distanceX / 30;
        }
        if (mouse.y != this.y) {
            this.y -= distanceY / 30;
        }
    }
    draw() {
        if (mouse.click) {
            contxt.lineWidth = 0.2;
            contxt.beginPath();
            contxt.moveTo(this.x, this.y);
            contxt.lineTo(mouse.x, mouse.y);
            contxt.stroke();
        }
        contxt.fillStyle = 'red';
        contxt.beginPath();
        contxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        contxt.fill();
        contxt.closePath();

        contxt.drawImage(alienPlayer, this.x - 58, this.y - 60, this.spriteWidth / 5, this.spriteHeight / 5);
    }
}
const player = new Player();

// meteorites
const meteoriteArray = [];
const meteoriteImage = new Image();
meteoriteImage.src = 'assets/images/meteorite.png';
class Meteorite {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100 + Math.random() * canvas.height;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
    }
    update() {
        this.y -= this.speed;
        const distanceX = this.x - player.x;
        const distanceY = this.y - player.y;
        this.distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
    draw() {
        contxt.fillStyle = 'gray';
        contxt.beginPath();
        contxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        contxt.fill();
        contxt.closePath();
        contxt.stroke();
        contxt.drawImage(meteoriteImage, this.x - 60, this.y - 60, this.radius * 2.8, this.radius * 2.8);
    }
}

function handleMeteorites() {
    if (gameFrame % 50 == 0) {
        meteoriteArray.push(new Meteorite());
        console.log(meteoriteArray.length);
    }
    for (let i = 0; i < meteoriteArray.length; i++) {
        meteoriteArray[i].update();
        meteoriteArray[i].draw();
        if (meteoriteArray[i].y < 0) {
            meteoriteArray.splice(i, 1);
        }
        if (meteoriteArray[i].distance < meteoriteArray[i].radius + player.radius) {
            (console.log('collision'));
            if (!meteoriteArray[i].counted) {
                score++;
                meteoriteArray[i].counted = true;
                meteoriteArray.splice(i, 1);
            }
        }
    }
}

// background
const backgroundImg = new Image();
backgroundImg.src = 'assets/images/spacebackground.png';

function background() {
    contxt.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

// Animation loop
function animate() {
    contxt.clearRect(0, 0, canvas.width, canvas.height);
    background();
    handleMeteorites();
    player.update();
    player.draw();
    contxt.fillText('score: ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

//Fix for mouse clicking bug when resizing browser
window.addEventListener('resize', function () {
    canvasPlacement = canvas.getBoundingClientRect();
});