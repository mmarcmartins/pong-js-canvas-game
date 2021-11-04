export default class Ball {
  constructor(context, x, y, radius, speed) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.velocity = { x: speed, y: 0 };
  }

  reset(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = "#FFFFFF";
    this.context.fill();
  }

  increaseSpeed() {
    this.speed += 0.5;
  }

  area() {
    return (Math.PI * this.radius) ^ 2;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  bounce(reference, width, height) {
    const angle = Math.atan2(reference.y - height / 3, reference.x - width / 3);

    this.increaseSpeed();

    const velocity = {
      x: Math.cos(angle) * this.speed * -1,
      y: Math.sin(angle) * this.speed * -1,
    };
    this.velocity = velocity;
  }
}
