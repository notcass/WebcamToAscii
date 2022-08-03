/// <reference path="libraries/p5.global-mode.d.ts" />

/*
 "Standard" character ramp for grey scale pictures, black -> white.

   "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`'. "

A more convincing but shorter sequence for representing 10 levels of grey is

   " .:-=+*#%@"

*/
let capture;
let img;
let modifier;
const step = 5;

function preload() {
  img = loadImage('lol.png');
  // img = loadImage('color.jpg');
  // img = loadImage('test.png');
}
function setup() {
  createCanvas(img.width, img.height).parent('sketch-holder');
  // capture = createCapture(VIDEO);
  // capture.size(480, 360);
  modifier = new Modifier(img);
  modifier.downsample(step);
}

function keyPressed() {
  if (key === 'q') isLooping() ? noLoop() : loop();
  if (key === 'r') modifier.reset();
  if (key === '1') modifier.convert(step);
}
