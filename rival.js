const rivalSprite = new Image();
rivalSprite.src = "assets/rival-sprite-sheet.png";

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

const rivals = [
  {
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
  },
  {
    x: 650,
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
  }
];

const RIVAL_TIME_REWARD = 5 * 60;

function rewardRivalDefeat() {
  timeRemaining += RIVAL_TIME_REWARD;
  updateTimerDisplay();
  console.log("Rival defeated! +5 minutes");
}

function chooseRandomRivalDirection(rival) {
  const directions = ["up", "down", "left", "right"];

  rival.direction =
    directions[Math.floor(Math.random() * directions.length)];

  rival.moveDuration = 70 + Math.floor(Math.random() * 100);
  rival.moveTimer = 0;
}

function updateRival(rival) {
  if (!rival.alive) return;

  rival.animationTimer++;

  if (rival.animationTimer > 12) {
    rival.walkFrame = rival.walkFrame === 0 ? 1 : 0;
    rival.animationTimer = 0;
  }

  rival.moveTimer++;

  if (rival.moveTimer >= rival.moveDuration) {
    chooseRandomRivalDirection(rival);
  }

  const oldX = rival.x;
  const oldY = rival.y;

  if (rival.direction === "left") rival.x -= rival.speed;
  if (rival.direction === "right") rival.x += rival.speed;
  if (rival.direction === "up") rival.y -= rival.speed;
  if (rival.direction === "down") rival.y += rival.speed;

  if (objectCollidesWithSolidTerrain(rival)) {
    rival.x = oldX;
    rival.y = oldY;
    chooseRandomRivalDirection(rival);
  }

  if (rival.x < 0) {
    rival.x = 0;
    chooseRandomRivalDirection(rival);
  }

  if (rival.y < 0) {
    rival.y = 0;
    chooseRandomRivalDirection(rival);
  }

  if (rival.x + rival.width > world.width) {
    rival.x = world.width - rival.width;
    chooseRandomRivalDirection(rival);
  }

  if (rival.y + rival.height > world.height) {
    rival.y = world.height - rival.height;
    chooseRandomRivalDirection(rival);
  }
}

function drawRival(rival) {
  if (!rival.alive) return;

  const x = rival.x - camera.x;
  const y = rival.y - camera.y;

  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(x + 4, y + rival.height - 4, rival.width - 8, 5);

  const frame = rivalSpriteFrames[rival.direction][rival.walkFrame];

  const drawWidth = 48;
  const drawHeight = 60;
  const drawX = x + rival.width / 2 - drawWidth / 2;
  const drawY = y + rival.height - drawHeight;

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

function getRivalHitBox(rival) {
  return {
    x: rival.x - 7,
    y: rival.y - 20,
    width: rival.width + 14,
    height: rival.height + 20
  };
}

gameLoop();