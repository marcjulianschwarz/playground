class Point{

    constructor(vector){
        this.x = vector.x;
        this.y = vector.y;
    }

    show(){
        if (this.x > this.y){
            fill(255);
            this.target = -1;
        }else{
            fill(0);
            this.target = 1;
        }
        ellipse(this.x, this.y, 8,8);
    }



}