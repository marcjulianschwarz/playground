
function activation(n){
    if (n >= 0){
        return 1;
    }else {
        return -1;
    }
}


class Perceptron{

    constructor(w){

        this.weights = [];

        for(let i = 0; i < w; i++){
            this.weights.push(random(-1, 1));
        }

    }

    guess(inputs){

        let sum = 0;
        for(let i = 0; i < this.weights.length; i++){
            sum += inputs[i] * this.weights[i];
        }

        let output = activation(sum);

        return output;

    }

    train(input, target){
        let guess = this.guess(input);
        let error = target - guess;
        
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] += error*input[i];
        }


    }




}


    


