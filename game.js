var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

var bgImage = new Image();
bgImage.src = "images/background.png";

var heroImage = new Image();
heroImage.src = "images/hero.png";

var appleImage = new Image();
appleImage.src = "images/apple.png";

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
}

var apple = {
  x: 0,
  y: 0
};

var applesCollected = 0;
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
  applesCollected = 0;
  moveThis(apple);
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
    hero.x <= (apple.x + 32)
    && apple.x <= (hero.x + 32)
    && hero.y <= (apple.y + 32)
    && apple.y <= (hero.y + 32)
  ) {
    ++applesCollected;
    moveThis(apple);
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

  collide();
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
  if(appleImage.complete) {
    ctx.drawImage(appleImage, apple.x, apple.y);
  }

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "15px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Apples collected: " + applesCollected, 32, 32);
};

var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  requestAnimationFrame(main);
};

var then = Date.now();
reset();
main();
