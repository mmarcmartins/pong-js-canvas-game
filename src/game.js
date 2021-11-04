import { PLAYER_HEIGHT } from "./constants.js";
import Player from "./player.js";
import Ball from "./ball.js";
import HandleInput from "./input.js";
import Scenario from "./scenario.js";

const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
const halfY = canvas.height / 2;
const halfX = canvas.width / 2;
const halfYPlayer = halfY - PLAYER_HEIGHT / 2;

const players = [
  new Player(30, halfYPlayer, 0, 20, PLAYER_HEIGHT, context),
  new Player(innerWidth - 50, halfYPlayer, 0, 20, PLAYER_HEIGHT, context),
];

const ball = new Ball(context, halfX, halfY, 10, 18);
const scenario = new Scenario(
  context,
  canvas.width,
  canvas.height,
  players,
  ball
);
const inputLayer = new HandleInput(players, canvas.height);
inputLayer.init();

const clearScreen = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
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
  ball.reset(canvas.width / 2, canvas.height / 2, { x: newXvelocity, y: 0 });
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
        canvas.width,
        canvas.height
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
