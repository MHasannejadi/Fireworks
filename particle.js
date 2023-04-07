class Particle {
  constructor(xCoord, yCoord, hue, firework, speed = 1) {
    this.life = 255;
    this.coord = createVector(xCoord, yCoord);
    this.hue = hue;
    this.firework = firework;
    this.accel = createVector(0, 0);
    if (this.firework) {
      if (speed === 1) {
        this.speed = createVector(0, random(-14, -6));
      } else {
        this.speed = createVector(0, speed);
      }
    } else {
      this.speed = p5.Vector.random2D();
      this.speed.mult(random(1, 13));
    }
  }

  applyForce(force) {
    this.accel.add(force);
  }

  show() {
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(2);
      stroke(this.hue, 255, 255, this.life);
    } else {
      strokeWeight(3);
      stroke(this.hue, 255, 255);
    }
    point(this.coord.x, this.coord.y);
  }

  update() {
    if (!this.firework) {
      this.speed.mult(0.9);
      this.life -= 5;
    }
    this.speed.add(this.accel);
    this.coord.add(this.speed);
    this.accel.mult(0);
  }

  done() {
    if (this.life < 0) {
      return true;
    } else {
      return false;
    }
  }
}
