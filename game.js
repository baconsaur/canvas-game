var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var frameTick = 0;
canvas.width = 600;
canvas.height = 600;

var bgImage = new Image();
bgImage.src = "images/background.png";

var heroImage = new Image();
heroImage.src = "images/hero.png";

var gemImage = new Image();
gemImage.src = "images/gem.png"

var raptorImage = new Image();
raptorImage.src = "images/raptor.png";

var hero = {
  speed: 256,
  x: 0,
  y: 0
};

var raptors = [];

function Raptor(){
  this.x = 32 + (Math.random() * (canvas.width - 64));
  this.y = 32 + (Math.random() * (canvas.height - 64));
  this.speed = 16;
}

var gem = {
  x: 0,
  y: 0,
  framePos: 0
};

var gemsCollected = 0;
var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

var reset = function() {
  hero.x = canvas.width / 2;
  hero.y = canvas.height /2;
  gemsCollected = 0;
  moveThis(gem);
  raptors = [];
};
var moveThis = function(obj) {
  obj.x = 32 + (Math.random() * (canvas.width - 64));
  obj.y = 32 + (Math.random() * (canvas.height - 64));
}
var collide = function() {
  for (var i=0; i < raptors.length; i++){
    if (
      hero.x <= (raptors[i].x + 32)
      && raptors[i].x <= (hero.x + 32)
      && hero.y <= (raptors[i].y + 32)
      && raptors[i].y <= (hero.y + 32)
    ) {
      reset();
    }
  }
  if (
    hero.x <= (gem.x + 32)
    && gem.x <= (hero.x + 32)
    && hero.y <= (gem.y + 32)
    && gem.y <= (hero.y + 32)
  ) {
    ++gemsCollected;
    moveThis(gem);
    raptors.push(new Raptor());
  }
};

var update = function(modifier) {
  if (38 in keysDown && hero.y > 32) { //up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown && hero.y < canvas.height - 64) { //down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown && hero.x > 32) { //left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown && hero.x < canvas.width - 64) { //right
    hero.x += hero.speed * modifier;
  }
  frameTick++;
  if (frameTick >= 5){
    if (gem.framePos < 124)
      gem.framePos += 18;
    else
      gem.framePos = 0;
      frameTick = 0;
  }
  collide();
}

var movement = function() {
  for (i in raptors){
    var moveRandom = Math.floor(Math.random() * 40);
    switch (moveRandom) {
      case 1:
        if (raptors[i].x < canvas.width - 128)
          raptors[i].x += raptors[i].speed;
        break;
      case 2:
        if (raptors[i].x > 64)
          raptors[i].x -= raptors[i].speed;
        break;
      case 3:
        if (raptors[i].y < canvas.height - 128)
          raptors[i].y += raptors[i].speed;
        break;
      case 4:
        if (raptors[i].x > 64)
          raptors[i].y -= raptors[i].speed;
        break;
    }
  }
}

var render = function() {
  if(bgImage.complete) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if(heroImage.complete) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if(raptorImage.complete) {
    for (var i in raptors)
      ctx.drawImage(raptorImage, raptors[i].x, raptors[i].y);
  }
  if(gemImage.complete) {
    ctx.drawImage(gemImage, gem.framePos, 0, 18, 18, gem.x, gem.y, 18, 18);
  }

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "15px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Gems collected: " + gemsCollected, 32, 32);
};

var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  movement();
  render();

  then = now;

  requestAnimationFrame(main);
};

var then = Date.now();
reset();
main();
