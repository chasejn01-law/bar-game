
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const responseOverlay =
  document.getElementById("responseOverlay");

const responseForm =
  document.getElementById("responseForm");

const responseText =
  document.getElementById("responseText");

let gamePaused = false;

let hitEnemy = null;

let hitRival = false;

const timerDisplay =
  document.getElementById("timer");

const gameOverOverlay =
  document.getElementById("gameOverOverlay");

const restartButton =
  document.getElementById("restartButton");

const GAME_TIME = 10 * 60;

const popupTimer =
  document.getElementById("popupTimer");


const playerSprite = new Image();
playerSprite.src = "assets/player-sprite-sheet.png";

const playerSpriteFrames = {
  down: [
    { x: 170, y: 100, width: 212, height: 339 },
    { x: 503, y: 100, width: 206, height: 339 }
  ],

  left: [
    { x: 161, y: 475, width: 211, height: 363 },
    { x: 511, y: 475, width: 210, height: 363 }
  ],

  right: [
    { x: 173, y: 887, width: 211, height: 362 },
    { x: 506, y: 887, width: 211, height: 362 }
  ],

  up: [
    { x: 174, y: 1286, width: 204, height: 354 },
    { x: 507, y: 1286, width: 205, height: 346 }
  ]
};

const enemySprite = new Image();
enemySprite.src = "assets/enemy-sprite-sheet.png";

const enemySpriteFrames = {
  down: [
    { x: 150, y: 105, width: 249, height: 348 },
    { x: 495, y: 105, width: 244, height: 339 }
  ],

  left: [
    { x: 165, y: 506, width: 235, height: 337 },
    { x: 507, y: 506, width: 233, height: 337 }
  ],

  right: [
    { x: 151, y: 907, width: 235, height: 341 },
    { x: 491, y: 907, width: 233, height: 341 }
  ],

  up: [
    { x: 146, y: 1304, width: 253, height: 352 },
    { x: 487, y: 1304, width: 254, height: 352 }
  ]
};

const waterImage = new Image();
waterImage.src = "assets/water.png";

const treeSprite = new Image();
treeSprite.src = "assets/tree-sprite-sheet.png";

const treeSpriteFrames = [
  {
    x: 0,
    y: 0,
    width: 627,
    height: 627
  },

  {
    x: 627,
    y: 0,
    width: 627,
    height: 627
  },

  {
    x: 0,
    y: 627,
    width: 627,
    height: 627
  },

  {
    x: 627,
    y: 627,
    width: 627,
    height: 627
  }
];

const rockWallSprite = new Image();
rockWallSprite.src = "assets/rock-wall-sprite-sheet.png";

const rockWallFrames = [
  { x: 48, y: 234, width: 841, height: 239 },
  { x: 959, y: 35, width: 221, height: 575 },
  { x: 48, y: 864, width: 846, height: 241 },
  { x: 949, y: 653, width: 241, height: 552 }
];

let timeRemaining = GAME_TIME;
let gameOver = false;

ctx.imageSmoothingEnabled = false;

const micButton =
  document.getElementById("micButton");

// --------------------
// PROMPT RESPONSE
// --------------------

let currentPrompt = null;

const promptWord = document.getElementById("promptWord");

const answerFeedback =
  document.getElementById("answerFeedback");

const submitAnswerButton =
  document.getElementById("submitAnswerButton");

const continueButton =
  document.getElementById("continueButton");

// --------------------
// WORLD
// --------------------

const world = {
  width: 2000,
  height: 1400
};

// --------------------
// CAMERA
// --------------------

const camera = {
  x: 0,
  y: 0
};

// --------------------
// PLAYER
// --------------------

const PLAYER_START_X = 400;
const PLAYER_START_Y = 400;


const player = {
  x: PLAYER_START_X,
  y: PLAYER_START_Y,
  width: 32,
  height: 32,
  speed: 4,

  walkFrame: 0,
  animationTimer: 0,

  direction: "down"
};

// --------------------
// PROJECTILE
// --------------------

const projectiles = [];

// --------------------
// ENEMIES
// --------------------

const enemies = [];

// --------------------
// WALLS
// --------------------

const walls = [
  {
    x: 500,
    y: 250,
    width: 250,
    height: 40,

    spriteIndex: 0,
    drawOffsetX: -10,
    drawOffsetY: -35,
    drawWidth: 270,

    collisionX: -5,
    collisionY: -10,
    collisionWidth: 260,
    collisionHeight: 65
  },

  {
    x: 900,
    y: 500,
    width: 40,
    height: 250,

    spriteIndex: 1,
    drawOffsetX: -28,
    drawOffsetY: -10,
    drawHeight: 270,

    collisionX: -25,
    collisionY: -5,
    collisionWidth: 90,
    collisionHeight: 260
  },

  {
    x: 300,
    y: 800,
    width: 300,
    height: 40,

    spriteIndex: 2,
    drawOffsetX: -10,
    drawOffsetY: -35,
    drawWidth: 320,

    collisionX: -5,
    collisionY: -10,
    collisionWidth: 310,
    collisionHeight: 65
  },

  {
    x: 1300,
    y: 300,
    width: 300,
    height: 40,

    spriteIndex: 0,
    drawOffsetX: -10,
    drawOffsetY: -35,
    drawWidth: 320,

    collisionX: -5,
    collisionY: -10,
    collisionWidth: 310,
    collisionHeight: 65
  }
];

// --------------------
// WATER
// --------------------

const waterAreas = [
  {
    x: 1100,
    y: 700,
    width: 350,
    height: 250
  },

  {
    x: 100,
    y: 1000,
    width: 300,
    height: 180
  }
];

// --------------------
// TREES
// --------------------

const trees = [
  {
    x: 150,
    y: 150,
    width: 110,
    height: 135,
    spriteIndex: 0,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 250,
    y: 180,
    width: 110,
    height: 135,
    spriteIndex: 1,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 800,
    y: 150,
    width: 110,
    height: 135,
    spriteIndex: 2,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 1000,
    y: 250,
    width: 110,
    height: 135,
    spriteIndex: 3,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 1500,
    y: 500,
    width: 110,
    height: 135,
    spriteIndex: 0,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 1600,
    y: 550,
    width: 110,
    height: 135,
    spriteIndex: 1,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 1700,
    y: 600,
    width: 110,
    height: 135,
    spriteIndex: 2,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 700,
    y: 1000,
    width: 110,
    height: 135,
    spriteIndex: 3,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 850,
    y: 1100,
    width: 110,
    height: 135,
    spriteIndex: 0,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 1200,
    y: 1150,
    width: 110,
    height: 135,
    spriteIndex: 1,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  },

  {
    x: 1400,
    y: 1200,
    width: 110,
    height: 135,
    spriteIndex: 2,
    collisionX: 38,
    collisionY: 100,
    collisionWidth: 34,
    collisionHeight: 28
  }
];

// --------------------
// ROCKS
// --------------------

const rocks = [
  { x: 450, y: 600, width: 28, height: 22 },
  { x: 750, y: 900, width: 30, height: 24 },
  { x: 1500, y: 1000, width: 26, height: 20 },
  { x: 1800, y: 400, width: 30, height: 24 }
];

// --------------------
// FLOWERS
// --------------------

const flowers = [
  { x: 100, y: 400 },
  { x: 200, y: 500 },
  { x: 600, y: 200 },
  { x: 1000, y: 400 },

  { x: 1500, y: 900 },
  { x: 1700, y: 1100 },
  { x: 500, y: 1200 },
  { x: 900, y: 1250 }
];

// --------------------
// KEYBOARD
// --------------------

const keys = {};

document.addEventListener("keydown", function(event) {

  if (gamePaused) {
    return;
  }

  keys[event.key.toLowerCase()] = true;

  if (
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.code === "Space"
  ) {
    event.preventDefault();
  }

  if (
    event.code === "Space" &&
    !event.repeat
  ) {
    shootProjectile();
  }
});

document.addEventListener("keyup", function(event) {
  keys[event.key.toLowerCase()] = false;
});

// --------------------
// ANSWER GRADING
// --------------------

const REQUIRED_SIMILARITY = 0.80;

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateSimilarity(userAnswer, correctAnswer) {
  const userWords =
    normalizeText(userAnswer)
      .split(" ")
      .filter(word => word.length > 0);

  const correctWords =
    normalizeText(correctAnswer)
      .split(" ")
      .filter(word => word.length > 0);

  if (
    userWords.length === 0 ||
    correctWords.length === 0
  ) {
    return 0;
  }

  let matchedWords = 0;

  const remainingUserWords = [...userWords];

  for (const correctWord of correctWords) {
    const matchIndex =
      remainingUserWords.indexOf(correctWord);

    if (matchIndex !== -1) {
      matchedWords++;

      // Prevent the same word from
      // counting multiple times
      remainingUserWords.splice(matchIndex, 1);
    }
  }

  return matchedWords / correctWords.length;
}

// --------------------
// SUBMIT TEXT
// --------------------

responseForm.addEventListener(
  "submit",
  function(event) {
    event.preventDefault();

    stopSpeechRecognition();

    const userAnswer =
      responseText.value.trim();

    if (
      userAnswer === "" ||
      !currentPrompt
    ) {
      return;
    }

    const similarity =
      calculateSimilarity(
        userAnswer,
        currentPrompt.definition
      );

    const percentage =
      Math.round(similarity * 100);

    // --------------------
    // CORRECT
    // --------------------

    if (similarity >= REQUIRED_SIMILARITY) {
      if (hitRival) {

        // Defeat rival
        rival.alive = false;

        // Special reward
        rewardRivalDefeat();

      } else {

        // Normal enemy
        const enemyIndex =
          enemies.indexOf(hitEnemy);

        if (enemyIndex !== -1) {
          enemies.splice(enemyIndex, 1);
        }

        // Normal enemy reward
        addHeart();
      }

        // Show success feedback
        if (hitRival) {
          answerFeedback.innerHTML = `
            <h3>✓ Rival Defeated!</h3>

            <p>
              ${percentage}% match
            </p>

            <p>
              ⏱ +5:00
            </p>
          `;
        } else {
          answerFeedback.innerHTML = `
            <h3>✓ Correct!</h3>

            <p>
              ${percentage}% match
            </p>
          `;
        }

        answerFeedback.classList.remove("hidden");
        answerFeedback.classList.add("correct-feedback");

        // Prevent additional submissions
        responseText.disabled = true;
        micButton.disabled = true;
        submitAnswerButton.classList.add("hidden");

        // Wait briefly so the player sees the success message
        setTimeout(function() {
        responseOverlay.classList.add("hidden");

        answerFeedback.classList.add("hidden");
        answerFeedback.classList.remove("correct-feedback");

        answerFeedback.innerHTML = "";

        responseText.disabled = false;
        micButton.disabled = false;
        responseText.value = "";

        submitAnswerButton.classList.remove("hidden");

        hitEnemy = null;
        hitRival = false;
        currentPrompt = null;;

        if (!gameOver) {
          gamePaused = false;
        }
      }, 650);

      return;
    }

    // --------------------
    // INCORRECT
    // --------------------

    removeHeart();

    answerFeedback.classList.remove("correct-feedback");

    answerFeedback.innerHTML = `
      <h3>❌ Incorrect — ${percentage}%</h3>

      <p>
        <strong>Correct Definition:</strong>
      </p>

      <p>
        ${currentPrompt.definition}
      </p>
    `;

    answerFeedback.classList.remove("hidden");

    // Don't let the player keep changing
    // the submitted answer.
    responseText.disabled = true;
    micButton.disabled = true;

    // Hide Submit and show Continue.
    submitAnswerButton.classList.add("hidden");
    continueButton.classList.remove("hidden");

    // IMPORTANT:
    // We DO NOT remove the enemy here.
    // Therefore the enemy stays alive.
  }
);

continueButton.addEventListener(
  "click",
  function() {

    stopSpeechRecognition();  

    answerFeedback.classList.add("hidden");
    answerFeedback.innerHTML = "";

    responseText.disabled = false;
    micButton.disabled = false;
    responseText.value = "";

    submitAnswerButton.classList.remove("hidden");
    continueButton.classList.add("hidden");

    responseOverlay.classList.add("hidden");

    hitEnemy = null;
    hitRival = false;
    currentPrompt = null;

    if (!gameOver) {
      gamePaused = false;
    }
  }
);

// --------------------
// COLLISION
// --------------------

function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function checkEnemyPlayerCollision() {

  // --------------------
  // NORMAL ENEMIES
  // --------------------

  for (const enemy of enemies) {
    if (isColliding(player, enemy)) {

      if (!playerInvulnerable) {
        damagePlayer();
        knockPlayerBack(enemy);
      }

      return;
    }
  }

  // --------------------
  // RIVAL
  // --------------------

  if (
    rival.alive &&
    isColliding(player, rival)
  ) {
    if (!playerInvulnerable) {
      damagePlayer();
      knockPlayerBack(rival);
    }
  }
}

function collidesWithSolidObject() {
  return objectCollidesWithSolidTerrain(player);
}

// --------------------
// WALL COLLISION
// --------------------

function getWallCollisionBox(wall) {
  return {
    x: wall.x + wall.collisionX,
    y: wall.y + wall.collisionY,
    width: wall.collisionWidth,
    height: wall.collisionHeight
  };
}

// --------------------
// PLAYER KNOCKBACK
// --------------------

function knockPlayerBack(enemy) {
  const knockbackDistance = 45;

  // Find the center of the player
  const playerCenterX =
    player.x + player.width / 2;

  const playerCenterY =
    player.y + player.height / 2;

  // Find the center of the enemy
  const enemyCenterX =
    enemy.x + enemy.width / 2;

  const enemyCenterY =
    enemy.y + enemy.height / 2;

  // Direction away from enemy
  const differenceX =
    playerCenterX - enemyCenterX;

  const differenceY =
    playerCenterY - enemyCenterY;

  const oldX = player.x;
  const oldY = player.y;

  // Push along whichever axis has the greater overlap/difference
  if (Math.abs(differenceX) > Math.abs(differenceY)) {

    // Enemy is mainly left/right of player
    if (differenceX > 0) {
      player.x += knockbackDistance;
    } else {
      player.x -= knockbackDistance;
    }

  } else {

    // Enemy is mainly above/below player
    if (differenceY > 0) {
      player.y += knockbackDistance;
    } else {
      player.y -= knockbackDistance;
    }
  }

  // Prevent knockback through terrain
  if (objectCollidesWithSolidTerrain(player)) {
    player.x = oldX;
    player.y = oldY;
  }

  // Keep player inside world
  if (player.x < 0) {
    player.x = 0;
  }

  if (player.y < 0) {
    player.y = 0;
  }

  if (player.x + player.width > world.width) {
    player.x =
      world.width - player.width;
  }

  if (player.y + player.height > world.height) {
    player.y =
      world.height - player.height;
  }
}

// --------------------
// TIMER
// --------------------

function updateTimerDisplay() {
  const minutes =
    Math.floor(timeRemaining / 60);

  const seconds =
    timeRemaining % 60;

  const formattedTime =
    `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

  // Normal timer
  timerDisplay.textContent =
    formattedTime;

  // Timer inside popup
  popupTimer.textContent =
    formattedTime;
}

const timerInterval = setInterval(function() {
  if (gameOver) {
    return;
  }

  timeRemaining--;

  updateTimerDisplay();

  if (timeRemaining <= 0) {
    endGame();
  }
}, 1000);

function endGame() {
  gameOver = true;
  gamePaused = true;

  timeRemaining = 0;

  updateTimerDisplay();

  gameOverOverlay.classList.remove("hidden");

  for (const key in keys) {
    keys[key] = false;
  }
}

restartButton.addEventListener("click", function() {
  location.reload();
});

updateTimerDisplay();

// --------------------
// SPAWN ENEMIES
// --------------------

function isSpawnAreaClear(enemy) {
  // Keep enemies away from solid terrain
  if (objectCollidesWithSolidTerrain(enemy)) {
    return false;
  }

  // Keep enemies from spawning on top of the player
  if (isColliding(enemy, player)) {
    return false;
  }

  // Keep enemies from spawning on top of each other
  for (const otherEnemy of enemies) {
    if (isColliding(enemy, otherEnemy)) {
      return false;
    }
  }

  return true;
}

function spawnEnemies(count) {
  let spawned = 0;
  let attempts = 0;

  const maxAttempts = count * 100;

  while (spawned < count && attempts < maxAttempts) {
    attempts++;

    const enemy = {
      x: Math.floor(
        Math.random() * (world.width - 100)
      ) + 50,

      y: Math.floor(
        Math.random() * (world.height - 100)
      ) + 50,

      width: 32,
      height: 32,

      speed: 1 + Math.random() * 0.8,

      direction: "down",

      moveTimer: 0,

      moveDuration:
        60 + Math.floor(Math.random() * 120),

      walkFrame: 0,
      animationTimer: 0
    };

    if (isSpawnAreaClear(enemy)) {
      chooseRandomEnemyDirection(enemy);

      enemies.push(enemy);

      spawned++;
    }
  }

  if (spawned < count) {
    console.warn(
      `Only spawned ${spawned} of ${count} enemies.`
    );
  }
}

// --------------------
// ENEMY MOVEMENT
// --------------------

function chooseRandomEnemyDirection(enemy) {
  const directions = [
    "up",
    "down",
    "left",
    "right"
  ];

  enemy.direction =
    directions[
      Math.floor(Math.random() * directions.length)
    ];

  enemy.moveDuration =
    60 + Math.floor(Math.random() * 120);

  enemy.moveTimer = 0;
}

// --------------------
// ENEMY COLLISION
// --------------------

function objectCollidesWithSolidTerrain(object) {
  for (const wall of walls) {
  const wallCollisionBox =
    getWallCollisionBox(wall);

    if (isColliding(object, wallCollisionBox)) {
      return true;
    }
  }

  for (const water of waterAreas) {
    if (isColliding(object, water)) {
      return true;
    }
  }

  for (const tree of trees) {
    const treeCollisionBox = {
      x: tree.x + tree.collisionX,
      y: tree.y + tree.collisionY,
      width: tree.collisionWidth,
      height: tree.collisionHeight
    };

    if (isColliding(object, treeCollisionBox)) {
      return true;
    }
  }

  for (const rock of rocks) {
    if (isColliding(object, rock)) {
      return true;
    }
  }

  return false;
}

// --------------------
// SHOOT PROJECTILE
// --------------------

function shootProjectile() {
  const projectileSpeed = 8;

  const projectile = {
    x: player.x + player.width / 2 - 4,
    y: player.y + player.height / 2 - 4,

    width: 10,
    height: 10,

    velocityX: 0,
    velocityY: 0
  };

  if (player.direction === "up") {
    projectile.velocityY = -projectileSpeed;

    projectile.y = player.y - projectile.height;
  }

  if (player.direction === "down") {
    projectile.velocityY = projectileSpeed;

    projectile.y = player.y + player.height;
  }

  if (player.direction === "left") {
    projectile.velocityX = -projectileSpeed;

    projectile.x = player.x - projectile.width;
  }

  if (player.direction === "right") {
    projectile.velocityX = projectileSpeed;

    projectile.x = player.x + player.width;
  }

  projectiles.push(projectile);
}

// --------------------
// OPEN RESPONSE BOX
// --------------------

function openResponseBox(enemy) {
  gamePaused = true;

  hitEnemy = enemy;

  hitRival = enemy === rival;

  for (const key in keys) {
    keys[key] = false;
  }

  const randomIndex =
    Math.floor(Math.random() * promptWords.length);

  currentPrompt =
    promptWords[randomIndex];

  promptWord.textContent =
    currentPrompt.word;

  responseText.value = "";

  answerFeedback.classList.add("hidden");
  answerFeedback.innerHTML = "";

  submitAnswerButton.classList.remove("hidden");
  continueButton.classList.add("hidden");

  responseText.disabled = false;
  micButton.disabled = false;

  responseOverlay.classList.remove("hidden");

  responseText.focus();
}

// --------------------
// UPDATE ENEMIES
// --------------------

function updateEnemies() {
  for (const enemy of enemies) {

    // --------------------
    // ANIMATION
    // --------------------

    enemy.animationTimer++;

    if (enemy.animationTimer > 12) {
      enemy.walkFrame =
        enemy.walkFrame === 0 ? 1 : 0;

      enemy.animationTimer = 0;
    }

    // --------------------
    // CHANGE DIRECTION
    // --------------------

    enemy.moveTimer++;

    if (enemy.moveTimer >= enemy.moveDuration) {
      chooseRandomEnemyDirection(enemy);
    }

    // Save old position in case enemy hits something
    const oldX = enemy.x;
    const oldY = enemy.y;

    // --------------------
    // MOVE ENEMY
    // --------------------

    if (enemy.direction === "left") {
      enemy.x -= enemy.speed;
    }

    if (enemy.direction === "right") {
      enemy.x += enemy.speed;
    }

    if (enemy.direction === "up") {
      enemy.y -= enemy.speed;
    }

    if (enemy.direction === "down") {
      enemy.y += enemy.speed;
    }

    // --------------------
    // TERRAIN COLLISION
    // --------------------

    if (objectCollidesWithSolidTerrain(enemy)) {
      enemy.x = oldX;
      enemy.y = oldY;

      chooseRandomEnemyDirection(enemy);
    }

    // --------------------
    // WORLD BOUNDARIES
    // --------------------

    if (enemy.x < 0) {
      enemy.x = 0;
      chooseRandomEnemyDirection(enemy);
    }

    if (enemy.y < 0) {
      enemy.y = 0;
      chooseRandomEnemyDirection(enemy);
    }

    if (enemy.x + enemy.width > world.width) {
      enemy.x =
        world.width - enemy.width;

      chooseRandomEnemyDirection(enemy);
    }

    if (enemy.y + enemy.height > world.height) {
      enemy.y =
        world.height - enemy.height;

      chooseRandomEnemyDirection(enemy);
    }
  }
}


// --------------------
// UPDATE PROJECTILES
// --------------------

function updateProjectiles() {
  for (
    let i = projectiles.length - 1;
    i >= 0;
    i--
  ) {
    const projectile = projectiles[i];

    projectile.x += projectile.velocityX;
    projectile.y += projectile.velocityY;

    let hitSomething = false;

    // --------------------
    // RIVAL COLLISION
    // --------------------

    if (rival.alive) {
      const rivalHitBox =
        getRivalHitBox();

      if (
        isColliding(
          projectile,
          rivalHitBox
        )
      ) {
        openResponseBox(rival);

        hitSomething = true;
      }
    }

    // --------------------
    // ENEMY COLLISION
    // --------------------

    if (!hitSomething) {
      for (
          let j = enemies.length - 1;
          j >= 0;
          j--
        ) {
        const enemy = enemies[j];

        const enemyHitBox = {
          x: enemy.x - 6,
          y: enemy.y - 18,
          width: enemy.width + 12,
          height: enemy.height + 18
        };

        if (isColliding(projectile, enemyHitBox)) {
          openResponseBox(enemy);

          hitSomething = true;

          break;
        }
      }
    }
    // --------------------
    // WALL COLLISION
    // --------------------

    if (!hitSomething) {
      for (const wall of walls) {
        const wallCollisionBox =
          getWallCollisionBox(wall);

        if (
          isColliding(
            projectile,
            wallCollisionBox
          )
        ) {
          hitSomething = true;
          break;
        }
      }
    }

    // --------------------
    // WATER COLLISION
    // --------------------

    if (!hitSomething) {
      for (const water of waterAreas) {
        if (isColliding(projectile, water)) {
          hitSomething = true;
          break;
        }
      }
    }

    // --------------------
    // TREE COLLISION
    // --------------------

    if (!hitSomething) {
      for (const tree of trees) {
        const treeCollisionBox = {
          x: tree.x + tree.collisionX,
          y: tree.y + tree.collisionY,
          width: tree.collisionWidth,
          height: tree.collisionHeight
        };

        if (
          isColliding(
            projectile,
            treeCollisionBox
          )
        ) {
          hitSomething = true;
          break;
        }
      }
    }

    // --------------------
    // ROCK COLLISION
    // --------------------

    if (!hitSomething) {
      for (const rock of rocks) {
        if (isColliding(projectile, rock)) {
          hitSomething = true;
          break;
        }
      }
    }

    // --------------------
    // REMOVE PROJECTILE
    // --------------------

    if (
      hitSomething ||
      projectile.x + projectile.width < 0 ||
      projectile.y + projectile.height < 0 ||
      projectile.x > world.width ||
      projectile.y > world.height
    ) {
      projectiles.splice(i, 1);
    }
  }
}

// --------------------
// UPDATE PLAYER
// --------------------

function updatePlayer() {
  let moving = false;

  const oldX = player.x;

  if (keys["arrowleft"] || keys["a"]) {
    player.x -= player.speed;
    player.direction = "left";
    moving = true;
  }

  if (keys["arrowright"] || keys["d"]) {
    player.x += player.speed;
    player.direction = "right";
    moving = true;
  }

  if (collidesWithSolidObject()) {
    player.x = oldX;
  }

  const oldY = player.y;

  if (keys["arrowup"] || keys["w"]) {
    player.y -= player.speed;
    player.direction = "up";
    moving = true;
  }

  if (keys["arrowdown"] || keys["s"]) {
    player.y += player.speed;
    player.direction = "down";
    moving = true;
  }

  if (collidesWithSolidObject()) {
    player.y = oldY;
  }

  // World boundaries
  if (player.x < 0) {
    player.x = 0;
  }

  if (player.y < 0) {
    player.y = 0;
  }

  if (player.x + player.width > world.width) {
    player.x = world.width - player.width;
  }

  if (player.y + player.height > world.height) {
    player.y = world.height - player.height;
  }

  // Walking animation
  if (moving) {
    player.animationTimer++;

    if (player.animationTimer > 8) {
      player.walkFrame =
        player.walkFrame === 0 ? 1 : 0;

      player.animationTimer = 0;
    }
  } else {
    player.walkFrame = 0;
    player.animationTimer = 0;
  }
}

// --------------------
// UPDATE CAMERA
// --------------------

function updateCamera() {
  camera.x =
    player.x +
    player.width / 2 -
    canvas.width / 2;

  camera.y =
    player.y +
    player.height / 2 -
    canvas.height / 2;

  if (camera.x < 0) {
    camera.x = 0;
  }

  if (camera.y < 0) {
    camera.y = 0;
  }

  if (camera.x + canvas.width > world.width) {
    camera.x = world.width - canvas.width;
  }

  if (camera.y + canvas.height > world.height) {
    camera.y = world.height - canvas.height;
  }
}

// --------------------
// UPDATE GAME
// --------------------

function update() {
  if (gamePaused || gameOver) {
    return;
  }

  updatePlayer();
  updateEnemies();
  updateRival();

  checkEnemyPlayerCollision();

  updateProjectiles();
  updateCamera();
}

// --------------------
// DRAW ENEMIES
// --------------------

function drawEnemy(enemy) {
  const x = enemy.x - camera.x;
  const y = enemy.y - camera.y;

  // --------------------
  // SHADOW
  // --------------------

  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";

  ctx.fillRect(
    x + 5,
    y + enemy.height - 4,
    enemy.width - 10,
    4
  );

  // --------------------
  // SELECT SPRITE FRAME
  // --------------------

  const frame =
    enemySpriteFrames[enemy.direction][enemy.walkFrame];

  // --------------------
  // DRAW SIZE
  // --------------------

  const drawWidth = 44;
  const drawHeight = 56;

  // Center sprite over enemy collision box
  const drawX =
    x +
    enemy.width / 2 -
    drawWidth / 2;

  // Anchor feet to bottom of collision box
  const drawY =
    y +
    enemy.height -
    drawHeight;

  // --------------------
  // DRAW SPRITE
  // --------------------

  ctx.drawImage(
    enemySprite,

    // Exact source rectangle
    frame.x,
    frame.y,
    frame.width,
    frame.height,

    // Position and size in game
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );
}

// --------------------
// DRAW PROJECTILES
// --------------------

function drawProjectiles() {
  for (const projectile of projectiles) {
    const x = projectile.x - camera.x;
    const y = projectile.y - camera.y;

    // --------------------
    // FLAME TAIL
    // --------------------

    ctx.fillStyle = "#165dcc";

    if (projectile.velocityX > 0) {
      // Moving right
      ctx.fillRect(x - 6, y + 3, 6, 4);
      ctx.fillRect(x - 3, y + 1, 4, 2);
    }

    if (projectile.velocityX < 0) {
      // Moving left
      ctx.fillRect(
        x + projectile.width,
        y + 3,
        6,
        4
      );

      ctx.fillRect(
        x + projectile.width - 1,
        y + 1,
        4,
        2
      );
    }

    if (projectile.velocityY > 0) {
      // Moving down
      ctx.fillRect(x + 3, y - 6, 4, 6);
      ctx.fillRect(x + 1, y - 3, 2, 4);
    }

    if (projectile.velocityY < 0) {
      // Moving up
      ctx.fillRect(
        x + 3,
        y + projectile.height,
        4,
        6
      );

      ctx.fillRect(
        x + 1,
        y + projectile.height - 1,
        2,
        4
      );
    }

    // --------------------
    // GLOW
    // --------------------

    ctx.fillStyle = "rgba(50, 160, 255, 0.25)";

    ctx.fillRect(
      x - 3,
      y - 3,
      projectile.width + 6,
      projectile.height + 6
    );

    // --------------------
    // OUTER FLAME
    // --------------------

    ctx.fillStyle = "#1677ff";

    ctx.fillRect(
      x,
      y + 2,
      projectile.width,
      projectile.height - 4
    );

    ctx.fillRect(
      x + 2,
      y,
      projectile.width - 4,
      projectile.height
    );

    // --------------------
    // INNER FLAME
    // --------------------

    ctx.fillStyle = "#54d8ff";

    ctx.fillRect(
      x + 2,
      y + 2,
      projectile.width - 4,
      projectile.height - 4
    );

    // --------------------
    // WHITE-HOT CENTER
    // --------------------

    ctx.fillStyle = "#e8fbff";

    ctx.fillRect(
      x + 4,
      y + 4,
      2,
      2
    );
  }
}

// --------------------
// DRAW GROUND
// --------------------

function drawGround() {
  ctx.fillStyle = "#8fbc6b";

  ctx.fillRect(
    -camera.x,
    -camera.y,
    world.width,
    world.height
  );

  ctx.fillStyle = "#7fad5e";

  for (let x = 20; x < world.width; x += 70) {
    for (let y = 20; y < world.height; y += 70) {
      ctx.fillRect(
        x - camera.x,
        y - camera.y,
        4,
        8
      );

      ctx.fillRect(
        x + 7 - camera.x,
        y + 4 - camera.y,
        3,
        6
      );
    }
  }
}

// --------------------
// PATHS
// --------------------

function drawPaths() {
  ctx.fillStyle = "#c9a66b";

  ctx.fillRect(
    -camera.x,
    420 - camera.y,
    1700,
    80
  );

  ctx.fillRect(
    700 - camera.x,
    420 - camera.y,
    80,
    800
  );

  ctx.fillRect(
    1200 - camera.x,
    100 - camera.y,
    70,
    500
  );

  ctx.fillStyle = "#d8b77c";

  for (let x = 30; x < 1700; x += 70) {
    ctx.fillRect(
      x - camera.x,
      445 - camera.y,
      30,
      5
    );

    ctx.fillRect(
      x + 20 - camera.x,
      475 - camera.y,
      25,
      4
    );
  }
}

// --------------------
// WATER
// --------------------

// --------------------
// WATER
// --------------------

function drawWater() {
  const tileSize = 64;

  for (const water of waterAreas) {
    const screenX =
      water.x - camera.x;

    const screenY =
      water.y - camera.y;

    // Dark edge around the pond
    ctx.fillStyle = "#326a91";

    ctx.fillRect(
      screenX - 4,
      screenY - 4,
      water.width + 8,
      water.height + 8
    );

    // Keep the tiled image inside
    // the water area's boundaries
    ctx.save();

    ctx.beginPath();

    ctx.rect(
      screenX,
      screenY,
      water.width,
      water.height
    );

    ctx.clip();

    // Tile the water PNG
    for (
      let y = 0;
      y < water.height;
      y += tileSize
    ) {
      for (
        let x = 0;
        x < water.width;
        x += tileSize
      ) {
        ctx.drawImage(
          waterImage,
          screenX + x,
          screenY + y,
          tileSize,
          tileSize
        );
      }
    }

    ctx.restore();
  }
}

// --------------------
// FLOWERS
// --------------------

function drawFlowers() {
  for (const flower of flowers) {
    const x = flower.x - camera.x;
    const y = flower.y - camera.y;

    ctx.fillStyle = "#4c8b47";
    ctx.fillRect(x + 3, y + 5, 2, 7);

    ctx.fillStyle = "#f3e66c";
    ctx.fillRect(x, y, 4, 4);
    ctx.fillRect(x + 5, y, 4, 4);
    ctx.fillRect(x + 2, y - 3, 4, 4);

    ctx.fillStyle = "#d98a36";
    ctx.fillRect(x + 3, y + 1, 3, 3);
  }
}

// --------------------
// DRAW WALL
// --------------------

function drawWall(wall) {
  const x = wall.x - camera.x;
  const y = wall.y - camera.y;

  const frame = rockWallFrames[wall.spriteIndex];

  const drawX = x + (wall.drawOffsetX || 0);
  const drawY = y + (wall.drawOffsetY || 0);

  let drawWidth;
  let drawHeight;

  // Preserve the original sprite aspect ratio
  if (wall.drawWidth && !wall.drawHeight) {
    drawWidth = wall.drawWidth;
    drawHeight =
      wall.drawWidth * (frame.height / frame.width);
  } else if (wall.drawHeight && !wall.drawWidth) {
    drawHeight = wall.drawHeight;
    drawWidth =
      wall.drawHeight * (frame.width / frame.height);
  } else {
    // Fallback: use collision size if no draw size is provided
    drawWidth = wall.width;
    drawHeight =
      wall.width * (frame.height / frame.width);
  }

  ctx.drawImage(
    rockWallSprite,

    // Source rectangle
    frame.x,
    frame.y,
    frame.width,
    frame.height,

    // Destination rectangle
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );
}

// --------------------
// DRAW TREE
// --------------------

function drawTree(tree) {
  const x = tree.x - camera.x;
  const y = tree.y - camera.y;

  const frame =
    treeSpriteFrames[tree.spriteIndex];

  // Draw tree sprite
  ctx.drawImage(
    treeSprite,

    // Source rectangle
    frame.x,
    frame.y,
    frame.width,
    frame.height,

    // Destination rectangle
    x,
    y,
    tree.width,
    tree.height
  );
}

// --------------------
// DRAW ROCK
// --------------------

function drawRock(rock) {
  const x = rock.x - camera.x;
  const y = rock.y - camera.y;

  ctx.fillStyle = "#686868";

  ctx.fillRect(
    x,
    y + 5,
    rock.width,
    rock.height - 5
  );

  ctx.fillStyle = "#969696";

  ctx.fillRect(
    x + 3,
    y,
    rock.width - 6,
    rock.height - 4
  );

  ctx.fillStyle = "#b0b0b0";

  ctx.fillRect(
    x + 7,
    y + 4,
    9,
    5
  );
}

// --------------------
// DRAW PLAYER
// --------------------

function drawPlayer() {
  
  // Flash while temporarily invulnerable
  if (
    playerInvulnerable &&
    Math.floor(Date.now() / 100) % 2 === 0
  ) {
    return;
  }  
  
  const x = player.x - camera.x;
  const y = player.y - camera.y;

  // Shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(
    x + 5,
    y + player.height - 4,
    player.width - 10,
    4
  );

  // Find the correct sprite
  const frame =
    playerSpriteFrames[player.direction][player.walkFrame];

  // Visual size of sprite
  const drawWidth = 42;
  const drawHeight = 56;

  // Center sprite over player's collision box
  const drawX =
    x + player.width / 2 - drawWidth / 2;

  // Put the sprite's feet at the bottom of the collision box
  const drawY =
    y + player.height - drawHeight;

  ctx.drawImage(
    playerSprite,

    // Source image crop
    frame.x,
    frame.y,
    frame.width,
    frame.height,

    // Position on game canvas
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );
}

// --------------------
// DEPTH SORTING
// --------------------

function drawDepthSortedObjects() {
  const drawables = [];

  // Add player
  drawables.push({
    type: "player",

    // Feet / bottom of player
    depth:
      player.y +
      player.height,

    object: player
  });

  // Add trees
  for (const tree of trees) {
  drawables.push({
    type: "tree",

    depth:
      tree.y +
      tree.collisionY +
      tree.collisionHeight,

    object: tree
  });
}

  // Add rocks
  for (const rock of rocks) {
    drawables.push({
      type: "rock",

      depth:
        rock.y +
        rock.height,

      object: rock
    });
  }

  // Add walls
  for (const wall of walls) {
    drawables.push({
      type: "wall",

      depth:
        wall.y +
        wall.collisionY +
        wall.collisionHeight,

      object: wall
    });
  }

  // add enemies

  for (const enemy of enemies) {
  drawables.push({
    type: "enemy",

    depth:
      enemy.y +
      enemy.height,

    object: enemy
  });
}

  // add rival

  if (rival.alive) {
  drawables.push({
    type: "rival",

    depth:
      rival.y +
      rival.height,

    object: rival
  });
}

  // Sort from top to bottom
  drawables.sort(function(a, b) {
    return a.depth - b.depth;
  });

  // Draw objects in sorted order
  for (const drawable of drawables) {
    if (drawable.type === "player") {
      drawPlayer();
    }

    if (drawable.type === "tree") {
      drawTree(drawable.object);
    }

    if (drawable.type === "rock") {
      drawRock(drawable.object);
    }

    if (drawable.type === "wall") {
      drawWall(drawable.object);
    }
    if (drawable.type === "enemy") {
      drawEnemy(drawable.object);
    }
    if (drawable.type === "rival") {
      drawRival();
    }
  }
}

// --------------------
// DRAW
// --------------------

function draw() {
  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  drawGround();
  drawPaths();
  drawWater();
  drawFlowers();
  drawDepthSortedObjects();
  drawProjectiles();
  drawHealth();
}

spawnEnemies(20);

// --------------------
// GAME LOOP
// --------------------

function gameLoop() {
  update();
  draw();

  requestAnimationFrame(gameLoop);
}

