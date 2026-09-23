// ====================
// RIVAL SYSTEM
// ====================

const rivalSprite = new Image();
rivalSprite.src = "assets/rival-sprite-sheet.png";


// --------------------
// SPRITE FRAMES
// --------------------
//
// Sheet order:
// Row 1 = down
// Row 2 = left
// Row 3 = right
// Row 4 = up
//
// These crops are based on the rival sprite sheet layout.
// If a few pixels need tweaking later, we can fine-tune them.

const rivalSpriteFrames = {
  down: [
    { x: 150, y: 90, width: 250, height: 350 },
    { x: 490, y: 90, width: 250, height: 350 }
  ],

  left: [
    { x: 150, y: 480, width: 250, height: 350 },
    { x: 490, y: 480, width: 250, height: 350 }
  ],

  right: [
    { x: 150, y: 880, width: 250, height: 350 },
    { x: 490, y: 880, width: 250, height: 350 }
  ],

  up: [
    { x: 150, y: 1270, width: 250, height: 350 },
    { x: 490, y: 1270, width: 250, height: 350 }
  ]
};


// --------------------
// RIVAL OBJECT
// --------------------

const rival = {
  x: 1650,
  y: 1050,

  width: 36,
  height: 36,

  speed: 1.35,

  direction: "down",

  walkFrame: 0,
  animationTimer: 0,

  moveTimer: 0,
  moveDuration: 90,

  alive: true
};


// --------------------
// RIVAL REWARD
// --------------------

const RIVAL_TIME_REWARD = 5 * 60;

function rewardRivalDefeat() {
  timeRemaining += RIVAL_TIME_REWARD;

  updateTimerDisplay();

  console.log("Rival defeated! +5 minutes");
}


// --------------------
// RANDOM MOVEMENT
// --------------------

function chooseRandomRivalDirection() {
  const directions = [
    "up",
    "down",
    "left",
    "right"
  ];

  rival.direction =
    directions[
      Math.floor(
        Math.random() * directions.length
      )
    ];

  rival.moveDuration =
    70 + Math.floor(Math.random() * 100);

  rival.moveTimer = 0;
}


// --------------------
// UPDATE RIVAL
// --------------------

function updateRival() {
  if (!rival.alive) {
    return;
  }

  rival.animationTimer++;

  if (rival.animationTimer > 12) {
    rival.walkFrame =
      rival.walkFrame === 0 ? 1 : 0;

    rival.animationTimer = 0;
  }

  rival.moveTimer++;

  if (
    rival.moveTimer >= rival.moveDuration
  ) {
    chooseRandomRivalDirection();
  }

  const oldX = rival.x;
  const oldY = rival.y;

  if (rival.direction === "left") {
    rival.x -= rival.speed;
  }

  if (rival.direction === "right") {
    rival.x += rival.speed;
  }

  if (rival.direction === "up") {
    rival.y -= rival.speed;
  }

  if (rival.direction === "down") {
    rival.y += rival.speed;
  }

  // Terrain collision
  if (objectCollidesWithSolidTerrain(rival)) {
    rival.x = oldX;
    rival.y = oldY;

    chooseRandomRivalDirection();
  }

  // World boundaries
  if (rival.x < 0) {
    rival.x = 0;
    chooseRandomRivalDirection();
  }

  if (rival.y < 0) {
    rival.y = 0;
    chooseRandomRivalDirection();
  }

  if (
    rival.x + rival.width >
    world.width
  ) {
    rival.x =
      world.width - rival.width;

    chooseRandomRivalDirection();
  }

  if (
    rival.y + rival.height >
    world.height
  ) {
    rival.y =
      world.height - rival.height;

    chooseRandomRivalDirection();
  }
}


// --------------------
// DRAW RIVAL
// --------------------

function drawRival() {
  if (!rival.alive) {
    return;
  }

  const x =
    rival.x - camera.x;

  const y =
    rival.y - camera.y;

  // Shadow
  ctx.fillStyle =
    "rgba(0, 0, 0, 0.25)";

  ctx.fillRect(
    x + 4,
    y + rival.height - 4,
    rival.width - 8,
    5
  );

  const frame =
    rivalSpriteFrames
      [rival.direction]
      [rival.walkFrame];

  const drawWidth = 48;
  const drawHeight = 60;

  const drawX =
    x +
    rival.width / 2 -
    drawWidth / 2;

  const drawY =
    y +
    rival.height -
    drawHeight;

  ctx.drawImage(
    rivalSprite,

    frame.x,
    frame.y,
    frame.width,
    frame.height,

    drawX,
    drawY,
    drawWidth,
    drawHeight
  );
}


// --------------------
// PROJECTILE HITBOX
// --------------------

function getRivalHitBox() {
  return {
    x: rival.x - 7,
    y: rival.y - 20,

    width:
      rival.width + 14,

    height:
      rival.height + 20
  };
}

gameLoop();