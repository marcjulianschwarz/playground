function Bot(x, y, radius, dna){

    this.pos = createVector(x, y);
    this.r = radius;

    this.show = function(){
        fill(255);
        ellipse(this.pos.x, this.pos.y, radius, radius);
    }

    this.moveRand = function(DNA){
        this.pos.x = this.pos.x + DNA.getRandomVector().x
        this.pos.y = this.pos.y + DNA.getRandomVector().y
    }
    
}