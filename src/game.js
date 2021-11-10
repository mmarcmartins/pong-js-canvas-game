import {
  PLAYER_HEIGHT,
  CANVAS,
  CONTEXT,
  HALF_X,
  HALF_Y,
  HALF_Y_PLAYER,
} from "./constants.js";
import Player from "./player.js";
import Ball from "./ball.js";
import HandleInput from "./input.js";
import Scenario from "./scenario.js";

const players = [
  new Player(30, HALF_Y_PLAYER, 0, 20, PLAYER_HEIGHT, CONTEXT),
  new Player(innerWidth - 50, HALF_Y_PLAYER, 0, 20, PLAYER_HEIGHT, CONTEXT),
];

const ball = new Ball(CONTEXT, HALF_X, HALF_Y, 10, 18);
const scenario = new Scenario(
  CONTEXT,
  CANVAS.width,
  CANVAS.height,
  players,
  ball
);
const inputLayer = new HandleInput(players, CANVAS.height);
inputLayer.init();

const clearScreen = () => {
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
};

const drawObjects = () => {
  players.forEach((player) => player.draw());
  ball.draw();
  ball.update();
  scenario.drawScoreBoard();
  scenario.drawSeparator();
};

const resetGame = (playerWinner) => {
  const newXvelocity = playerWinner === 0 ? ball.speed : ball.speed * -1;
  players[playerWinner].points += 1;
  ball.reset(CANVAS.width / 2, CANVAS.height / 2, { x: newXvelocity, y: 0 });
};

const gameLoop = () => {
  clearScreen();
  drawObjects();

  const [hasWinner, playerWinner] = scenario.checkCollisionWinner(ball);

  if (!hasWinner) {
    const collisionWithBoundries = scenario.checkCollisionWithBoundries();
    const collisionWithPlayer = scenario.checkCollisionWithPlayers(players);
    if (collisionWithBoundries || collisionWithPlayer) {
      ball.bounce(
        collisionWithBoundries || collisionWithPlayer,
        CANVAS.width,
        CANVAS.height
      );
    }
  } else {
    resetGame(playerWinner);
  }
  requestAnimationFrame(gameLoop);
};

window.onload = () => {
  gameLoop();
};
