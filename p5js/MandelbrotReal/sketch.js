function setup(){

    createCanvas(700, 700);
    pixelDensity(1);

}

function draw(){

    var maxiterations = 100;    
      loadPixels();

      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
    
          var a = map(x, 0, width, -2.6, 2.6);
          var b = map(y, 0, height, -2.6, 2.6);
    
          var ca = a;
          var cb = b;
    
          var n = 0;
    
          while (n < maxiterations) {
            var aa = a * a - b * b;
            var bb = 2 * a * b;
            a = aa + ca;
            b = bb + cb;
            if (a * a + b * b > 20) {
              break;
            }
            n++;
          }
    
          var bright = map(n, 0, maxiterations, 0, 1);
          bright = map(sqrt(bright), 0, 1, 0, 255);
    
          if (n == maxiterations) {
            bright = 0;
          }
    
          var pix = (x + y * width) * 4;
          pixels[pix + 0] = bright;
          pixels[pix + 1] = bright;
          pixels[pix + 2] = bright;
          pixels[pix + 3] = 255;
        }
      }
      updatePixels();

} // DRAW


