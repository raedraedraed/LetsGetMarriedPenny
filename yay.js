document.addEventListener('DOMContentLoaded', function() {
    const flowersCanvas = document.getElementById('flowersCanvas');
    const ctx = flowersCanvas.getContext('2d');
    const confettiColors = ['#FFC0CB', '#FF69B4', '#FFD700', '#FF6347', '#66FF66', '#44FF44', '#69B4FF'];
    const popupMessage = document.getElementById('popupMessage');
    const countdownElement = document.getElementById('countdown');
    const audioElement = document.querySelector('audio');
    const catGif = document.getElementById('catGif');

    const confetti = [];
    const hearts = [];
    
    let lastConfettiCreationTime = 0;
    let lastHeartCreationTime = 0;
    const confettiCreationInterval = 100;
    const heartCreationInterval = 500;

    let countdown = 10;
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            popupMessage.style.display = 'block';
        }
    }, 1000);
    
    // Create confetti
    function createConfetti() {
        const x = Math.random() * flowersCanvas.width;
        const y = -10;
        const size = Math.random() * 8 + 4;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const speed = Math.random() * 2 + 1;
        
        confetti.push({ x, y, size, color, speed });
    }
    
    // Create hearts
    function createHeart() {
        const x = Math.random() * flowersCanvas.width;
        const y = Math.random() * flowersCanvas.height;
        const size = Math.random() * 15 + 10;
        
        hearts.push({ x, y, size });
    }
    
    // Draw confetti
    function drawConfetti() {
        ctx.clearRect(0, 0, flowersCanvas.width, flowersCanvas.height);
        
        confetti.forEach((conf, index) => {
            conf.y += conf.speed;
            conf.x += Math.sin(conf.y / 20);
            
            ctx.beginPath();
            ctx.arc(conf.x, conf.y, conf.size, 0, Math.PI * 2);
            ctx.fillStyle = conf.color;
            ctx.fill();
            
            if (conf.y - conf.size > flowersCanvas.height) {
                confetti.splice(index, 1);
            }
        });
    }
    
    // Draw hearts
    function drawHearts() {
        hearts.forEach((heart, index) => {
            ctx.beginPath();
            ctx.moveTo(heart.x, heart.y);
            ctx.bezierCurveTo(heart.x, heart.y - heart.size / 2, heart.x - heart.size / 2, heart.y - heart.size / 2, heart.x - heart.size / 2, heart.y);
            ctx.bezierCurveTo(heart.x - heart.size / 2, heart.y + heart.size / 2, heart.x, heart.y + heart.size, heart.x, heart.y + heart.size);
            ctx.bezierCurveTo(heart.x, heart.y + heart.size, heart.x + heart.size / 2, heart.y + heart.size / 2, heart.x + heart.size / 2, heart.y);
            ctx.bezierCurveTo(heart.x + heart.size / 2, heart.y - heart.size / 2, heart.x, heart.y - heart.size / 2, heart.x, heart.y);
            ctx.fillStyle = 'rgba(255, 105, 180, 0.7)';
            ctx.fill();
            
            heart.y -= 0.5;
            heart.x += Math.sin(heart.y / 20);
            
            if (heart.y + heart.size < 0) {
                hearts.splice(index, 1);
            }
        });
    }
    
    // Animation loop
    function animate(timestamp) {
        drawConfetti();
        drawHearts();
        
        if (timestamp - lastConfettiCreationTime > confettiCreationInterval) {
            createConfetti();
            lastConfettiCreationTime = timestamp;
        }
        
        if (timestamp - lastHeartCreationTime > heartCreationInterval) {
            createHeart();
            lastHeartCreationTime = timestamp;
        }
        
        requestAnimationFrame(animate);
    }
    
    // Resize canvas
    function resizeCanvas() {
        flowersCanvas.width = window.innerWidth;
        flowersCanvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    requestAnimationFrame(animate);
    
    // Change the title
    document.title = 'OFFICIALLY MARRIED!!!';
    
    // Toggle play/pause music
    catGif.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    });
});
