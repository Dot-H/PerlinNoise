// JavaScript source code

function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
    this.col = 0;

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.out_of_bounds();
        this.acc.mult(0); // Have to use mult because it's a vector.
    }

    this.updatePrev = function () {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.follow = function (vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }

    this.show = function () {
        stroke(0, 0, this.col, 2);
        this.col = this.col + 1;
        if (this.col > 255) {
          this.col = 0;
        }
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    this.out_of_bounds = function () {
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        else if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
        else if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
    }
}
