/// <reference path="libraries/p5.global-mode.d.ts" />

/*
 "Standard" character ramp for grey scale pictures, black -> white.

   "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`'. "

A more convincing but shorter sequence for representing 10 levels of grey is

   " .:-=+*#%@"

*/
let capture;
let modifier;

const step = 4; // Tweak this value

function setup() {
  createCanvas(480, 360).parent('sketch-holder');

  capture = createCapture(VIDEO);
  capture.size(480, 360);
  capture.hide();

  modifier = new Modifier(capture);

  // textFont('Helvetica');
  // textFont('Arial');
  // textFont('Courier New');
  // textFont('Verdana');
  textStyle(BOLD);
  // textStyle(ITALIC);
}

function draw() {
  modifier.show(capture);
  modifier.convert(step);
}

function keyPressed() {
  if (key === 'q') isLooping() ? noLoop() : loop();
  if (key === 'r') redraw();
  if (key === '1') console.log(frameRate());
}
