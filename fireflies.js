const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";
canvas.style.opacity = "0.4";

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const fireflies = [];

for (let i = 0; i < 30; i++) {
  fireflies.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 1,
    d: Math.random() * 2 + 0.5,
    vx: Math.random() * 0.6 - 0.3,
    vy: Math.random() * 0.6 - 0.3,
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  fireflies.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 200, ${Math.random() * 0.8 + 0.2})`;
    ctx.fill();
  });
  move();
}

function move() {
  fireflies.forEach(f => {
    f.x += f.vx;
    f.y += f.vy;

    if (f.x < 0 || f.x > width) f.vx *= -1;
    if (f.y < 0 || f.y > height) f.vy *= -1;
  });
}

function animate() {
  draw();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});