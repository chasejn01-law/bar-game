// ====================
// HEALTH SYSTEM
// ====================

const heartImage = new Image();
heartImage.src = "assets/heart.png";

let playerHealth = 3;

// Player cannot be damaged repeatedly during this period
let playerInvulnerable = false;

const INVULNERABILITY_TIME = 1000;


// ====================
// DRAW HEALTH
// ====================

function drawHealth() {
  ctx.save();

  const startX = 20;
  const startY = 20;

  const heartWidth = 40;
  const heartHeight = 40;
  const spacing = 32;

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";

  for (let i = 0; i < playerHealth; i++) {
    ctx.drawImage(
      heartImage,
      startX + i * spacing,
      startY,
      heartWidth,
      heartHeight
    );
  }

  ctx.restore();
}


// ====================
// ADD HEALTH
// ====================

function addHeart() {
  playerHealth++;
}


// ====================
// DAMAGE PLAYER
// ====================

function damagePlayer() {
  // Ignore damage while temporarily invulnerable
  if (playerInvulnerable || gameOver) {
    return;
  }

  playerHealth--;

  if (playerHealth < 0) {
    playerHealth = 0;
  }

  // No health remaining
  if (playerHealth <= 0) {
    endGame();
    return;
  }

  // Temporarily protect player from another hit
  playerInvulnerable = true;

  setTimeout(function() {
    playerInvulnerable = false;
  }, INVULNERABILITY_TIME);
}


// ====================
// REMOVE HEALTH
// ====================

function removeHeart() {
  if (gameOver) {
    return;
  }

  playerHealth--;

  if (playerHealth < 0) {
    playerHealth = 0;
  }

  if (playerHealth <= 0) {
    endGame();
  }
}