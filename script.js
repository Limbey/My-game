const player = document.getElementById('player');
const target = document.getElementById('target');
const gameContainer = document.getElementById('game-container');

let score = 0;

// Move target randomly
function moveTarget() {
    const x = Math.random() * (gameContainer.clientWidth - target.clientWidth);
    const y = Math.random() * (gameContainer.clientHeight - target.clientHeight);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

// Update score and move target when clicked
target.addEventListener('click', () => {
    score++;
    document.getElementById('score').innerText = `Score: ${score}`;
    moveTarget();
});

// Move player with touch gestures
let touchStartX = 0;
let touchStartY = 0;

gameContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

gameContainer.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    const playerRect = player.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();

    if (playerRect.top + deltaY > gameRect.top && playerRect.bottom + deltaY < gameRect.bottom) {
        player.style.top = `${playerRect.top + deltaY}px`;
    }
    if (playerRect.left + deltaX > gameRect.left && playerRect.right + deltaX < gameRect.right) {
        player.style.left = `${playerRect.left + deltaX}px`;
    }

    touchStartX = touchEndX;
    touchStartY = touchEndY;
});

moveTarget();
