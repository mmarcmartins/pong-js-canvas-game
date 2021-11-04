export default class Scenario {
  constructor(context, width, height, players, ball) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.players = players;
    this.ball = ball;
  }

  drawScoreBoard() {
    this.context.font = "48px roboto";
    this.context.fillText(this.players[0].points, 200, 50);
    this.context.fillText(this.players[1].points, this.width - 300, 50);
  }

  drawSeparator = () => {
    const context = this.context;
    context.strokeStyle = "#FFF";
    context.setLineDash([5, 3]);
    context.beginPath();
    context.moveTo(this.width / 2, 0);
    context.lineTo(this.width / 2, this.height);
    context.stroke();
    context.closePath();
  };

  checkCollisionWinner() {
    const ball = this.ball;
    if (ball.x <= ball.area() * -1) {
      return [true, 0];
    }

    if (ball.x >= this.width + ball.radius * 2) {
      return [true, 1];
    }

    return [false, null];
  }

  checkCollisionWithBoundries() {
    if (this.ball.y >= this.height || this.ball.y <= 0) {
      return this.ball;
    }
  }

  checkCollisionWithPlayers(players) {
    const ball = this.ball;
    return players.filter((player) => {
      const distX = Math.abs(ball.x - player.x);
      if (distX <= ball.area()) {
        if (
          ball.y + ball.radius >= player.y &&
          ball.y - ball.radius <= player.y + player.height
        ) {
          return true;
        }
      }
      return false;
    })[0];
  }
}
