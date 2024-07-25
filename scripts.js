document.addEventListener('DOMContentLoaded', function() {
    const flowersCanvas = document.getElementById('flowersCanvas');
    const ctx = flowersCanvas.getContext('2d');
    const flowerColors = ['#FFC0CB', '#FF69B4', '#FFD700', '#FF6347'];
    const noBtn = document.getElementById('noBtn');
    const noClickCounter = document.getElementById('noClickCounter');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    let noClickCount = 0;
    const flowers = [];
    let lastFlowerCreationTime = 0;
    const flowerCreationInterval = 1000;

    function createFlower() {
        const x = Math.random() * flowersCanvas.width;
        const y = -10;
        const radius = Math.random() * 5 + 3;
        const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];

        flowers.push({ x, y, radius, color });
    }

    function animateFlowers() {
        ctx.clearRect(0, 0, flowersCanvas.width, flowersCanvas.height);

        flowers.forEach((flower, index) => {
            flower.y += 0.5;
            flower.x += Math.sin(flower.y / 30);

            ctx.beginPath();
            ctx.arc(flower.x, flower.y, flower.radius, 0, Math.PI * 2);
            ctx.fillStyle = flower.color;
            ctx.fill();

            if (flower.y - flower.radius > flowersCanvas.height) {
                flowers.splice(index, 1);
            }
        });

        requestAnimationFrame(animateFlowers);
    }

    function loop(timestamp) {
        if (timestamp - lastFlowerCreationTime > flowerCreationInterval) {
            createFlower();
            lastFlowerCreationTime = timestamp;
        }
        requestAnimationFrame(loop);
    }

    function resizeCanvas() {
        flowersCanvas.width = window.innerWidth;
        flowersCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    requestAnimationFrame(animateFlowers);
    requestAnimationFrame(loop);

    noBtn.addEventListener('mouseover', function(e) {
        const btnRect = noBtn.getBoundingClientRect();
        const offset = 50;

        const newX = Math.random() * (window.innerWidth - btnRect.width - offset * 2) + offset;
        const newY = Math.random() * (window.innerHeight - btnRect.height - offset * 2) + offset;

        noBtn.style.position = 'absolute';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        noClickCount++;
        noClickCounter.textContent = `Attempts: ${noClickCount}`;

        if (noClickCount >= 10) {
            modal.style.display = 'flex';
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
