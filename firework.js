class Firework {
  constructor(xCoord = random(width), speed) {
    this.hu = random(255);
    this.firework = new Particle(xCoord, height, this.hu, true, speed);
    this.exploded = false;
    this.particles = [];
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.speed.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    sound.play();
    for (let i = 0; i < random(50, 150); i++) {
      const p = new Particle(
        this.firework.coord.x,
        this.firework.coord.y,
        this.hu,
        false
      );
      this.particles.push(p);
    }
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
