
// Enhanced fireflies with pulsing effect
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";
canvas.style.opacity = "0.6";

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const fireflies = [];

// Create fireflies with enhanced properties
for (let i = 0; i < 25; i++) {
    fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1,
        d: Math.random() * 2 + 0.5,
        vx: Math.random() * 0.8 - 0.4,
        vy: Math.random() * 0.8 - 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.05
    });
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    fireflies.forEach(f => {
        // Create pulsing intensity
        const intensity = Math.sin(f.pulse) * 0.5 + 0.5;
        
        // Draw the firefly with glow effect
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        
        // Set glow effect
        ctx.shadowColor = 'rgba(255, 255, 200, 0.8)';
        ctx.shadowBlur = 15 * intensity;
        
        // Fill with pulsing color
        ctx.fillStyle = `rgba(255, 255, 200, ${intensity * 0.8 + 0.2})`;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Update pulse
        f.pulse += f.pulseSpeed;
    });
    move();
}

function move() {
    fireflies.forEach(f => {
        f.x += f.vx;
        f.y += f.vy;

        // Bounce off edges
        if (f.x < 0 || f.x > width) f.vx *= -1;
        if (f.y < 0 || f.y > height) f.vy *= -1;
        
        // Keep within bounds
        f.x = Math.max(0, Math.min(width, f.x));
        f.y = Math.max(0, Math.min(height, f.y));
    });
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

// Start animation when page loads
document.addEventListener("DOMContentLoaded", () => {
    animate();
});
