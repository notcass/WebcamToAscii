class Modifier {
  constructor(capture, short, swap) {
    this.img = capture;
    this.colorSwap = swap;
    this.long =
      '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
    this.short = '@%#*+=-:. ';
    this.chars = short ? this.short : this.long;
  }

  show(frame) {
    this.img = frame.get();
    this.img.loadPixels();

    this.img.updatePixels();
    image(this.img, 0, 0);
  }

  convert(step) {
    if (this.colorSwap) {
      background(0);
      fill(255);
    } else {
      background(255);
      fill(0);
    }

    // Rave Mode
    // fill(random(255), random(255), random(255));

    // Tweak this value
    textSize(step);

    let width = this.img.width;
    let height = this.img.height;

    let maxOuterVert = width * height * 4 - width * 4;

    // The x, y coords for the character
    let x = 0;
    let y = 0;

    // Vertical loop
    for (
      let outerVert = 0;
      outerVert < maxOuterVert;
      outerVert += width * 4 * step
    ) {
      // Horizontal Loop
      for (
        let outerHorizontal = outerVert;
        outerHorizontal < outerVert + width * 4;
        outerHorizontal += step * 4
      ) {
        let shade = this.img.pixels[outerHorizontal]; // Greyscale Value
        let charIndex;
        let cLen = this.chars.length - 1;

        if (this.colorSwap) {
          charIndex = floor(map(shade, 255, 0, 0, cLen));
        } else {
          charIndex = floor(map(shade, 255, 0, cLen, 0));
        }
        let char = this.chars[charIndex];

        //============= VARIABLE TEXT SIZE TESTING ============
        // let s = map(charIndex, 0, cLen, 10, 4);
        // textSize(s);

        //=====================================================
        text(char, x, y);
        x += step;
      }
      x = 0;
      y += step;
    }
  }

  // prettier-ignore
  downsample(stepValue) {
    let width = this.img.width;
    let height = this.img.height;
    let step = stepValue;

    let maxOuterVert = width * height * 4 - width * 4;

    // outer vertical loop: step = 5    0, 500, 1000, 2000
    for ( let outerVert = 0; outerVert < maxOuterVert; outerVert += width * 4 * step) {
      // console.log(`OUTERVERT ${outerVert}`);

      // outer horizontal loop: step = 5    0, 20, 40 or 500, 520, 540 etc
      for ( let outerHorizontal = outerVert; outerHorizontal < outerVert + width * 4; outerHorizontal += step * 4) {
        // console.log(`  outerHorizontal ${outerHorizontal}`);
        // console.log(`  outerHorizontal max ${outerVert + width * 4}`);

        let redTotal = 0;
        let greenTotal = 0;
        let blueTotal = 0;
        let alphaTotal = 0;

        // CHUNK ANALYSIS
        for ( let innerVert = outerHorizontal; innerVert < outerHorizontal + step * (width * 4); innerVert += width * 4) {
          // console.log(`    innerVert ${innerVert}`);
          for ( let innerHorizontal = innerVert; innerHorizontal < innerVert + step * 4; innerHorizontal += 4) {
            // console.log(`        innerHorizontal ${innerHorizontal}`);
            redTotal += this.img.pixels[innerHorizontal];
            greenTotal += this.img.pixels[innerHorizontal + 1];
            blueTotal += this.img.pixels[innerHorizontal + 2];
            alphaTotal += this.img.pixels[innerHorizontal + 3];
          }
        }

        let div = step * step;

        let redAvg = floor(redTotal / div);
        let greenAvg = floor(greenTotal / div);
        let blueAvg = floor(blueTotal / div);
        let alphaAvg = floor(alphaTotal / div);

        // CHUNK MODIFY
        for ( let innerVert = outerHorizontal; innerVert < outerHorizontal + step * (width * 4); innerVert += width * 4) {
          for ( let innerHorizontal = innerVert; innerHorizontal < innerVert + step * 4; innerHorizontal += 4) {
            // console.log(`        innerHorizontal ${innerHorizontal}`);
            this.img.pixels[innerHorizontal] = redAvg;
            this.img.pixels[innerHorizontal + 1] = greenAvg;
            this.img.pixels[innerHorizontal + 2] = blueAvg;
            // this.img.pixels[innerHorizontal + 3] = alphaAvg;
          }
        }
      }
    }
    this.show();
  }
}
