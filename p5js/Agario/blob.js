function Blob(r, x, y, color){

    this.pos = createVector(x, y);
    this.radius = r;

    this.show = function(){
        fill(color);
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    this.update = function(){
        this.vel = createVector(mouseX -width / 2, mouseY -height / 2);
        this.vel.setMag(100 / this.radius * 2);
        this.pos.add(this.vel);
    }


    this.eats = function(other) {
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.radius + other.radius) {
          var sum = PI * this.radius * this.radius + PI * other.radius * other.radius;
          this.radius = sqrt(sum / PI);
          //this.r += other.r;
          return true;
        } else {
          return false;
        }
      }

      this.poppedBy = function(spike){
          var d = p5.Vector.dist(this.pos, spike.pos);
          if(d < this.radius + spike.radius){
            var sumS = PI * this.radius * this.radius - PI * spike.radius * spike.radius;
            this.radius = sqrt(sumS / PI);
            return true
          } else{
              return false
          }
      }

      this.tooSmall = function(){
          if(this.radius < 30){
              return true;
          } else {
              return false;
          }
      }




}