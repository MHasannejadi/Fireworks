let sound;
let gravity;
const fireworks = [];

function preload() {
  sound = loadSound("sound-effect.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.15);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (random(1) < 0.04) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function drawMultiFirework() {
  for (let index = 0; index < random(10) + 10; index++) {
    fireworks.push(new Firework());
  }
}
async function drawRTL() {
  const number = random(10) + 10;
  const sectionsWidth = window.innerWidth / number;
  for (let index = number; index > 0; index--) {
    const xCoord = sectionsWidth * (index + random(1));
    fireworks.push(new Firework(xCoord));
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}
async function drawLTR() {
  const number = random(10) + 10;
  const sectionsWidth = window.innerWidth / number;
  for (let index = 0; index < number; index++) {
    const xCoord = sectionsWidth * (index + random(1));
    fireworks.push(new Firework(xCoord));
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}
document.addEventListener("keypress", function onEvent(event) {
  if (event.key === "1") {
    drawMultiFirework();
  } else if (event.key === "2") {
    drawRTL();
  } else if (event.key === "3") {
    drawLTR();
  }
});

let clickDownTime;
function handleMouseDown() {
  clickDownTime = new Date();
}
function handleMouseUp(event) {
  const clickUpTime = new Date();
  const keepTime = (clickUpTime - clickDownTime) / 1000;
  let speed;
  if (keepTime >= 1) {
    speed = -14;
  } else {
    speed = -6 - keepTime * 8;
  }
  fireworks.push(new Firework(event?.clientX, speed));
}
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);