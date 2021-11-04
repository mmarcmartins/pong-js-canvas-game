import { MOVE_SPEED } from "./constants.js";

export default class HandleInput {
  constructor(players, canvasHeight) {
    this.players = players;
    this.canvasHeight = canvasHeight;
  }

  init() {
    document.addEventListener("keydown", ({ key }) => {
      const movement = this.handleMovement()[key];
      movement && movement();
    });
  }

  handleMovement() {
    return {
      w: () =>
        this.checkBoundries(this.players[0], "top") &&
        (this.players[0].y -= MOVE_SPEED),
      s: () =>
        this.checkBoundries(this.players[0], "down") &&
        (this.players[0].y += MOVE_SPEED),
      ArrowUp: () =>
        this.checkBoundries(this.players[1], "top") &&
        (this.players[1].y -= MOVE_SPEED),
      ArrowDown: () =>
        this.checkBoundries(this.players[1], "down") &&
        (this.players[1].y += MOVE_SPEED),
    };
  }

  checkBoundries(player, position) {
    if (position === "top" && player.y - MOVE_SPEED < 1) return false;
    if (
      position === "down" &&
      player.y + player.height + MOVE_SPEED > this.canvasHeight
    )
      return false;
    return true;
  }
}
