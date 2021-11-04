export default class Player {
  constructor(x, y, points, width, height, context) {
    this.x = x;
    this.y = y;
    this.initialCoordinates = { x, y };
    this.width = width;
    this.height = height;
    this.points = points;
    this.context = context;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.fill();
  }

  reset() {
    this.x = this.initialCoordinates.x;
    this.y = this.initialCoordinates.y;
    this.points = 0;
    this.draw();
  }
}
