var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;

var bgImage = new Image();
bgImage.src = "images/background.png";

var heroImage = new Image();
heroImage.src = "images/hero.png";

var monsterImage = new Image();
monsterImage.src = "images/monster.png";

var hero = {
  speed: 256,
  x: 0,
  y: 0
};

var monster = {
  x: 0,
  y: 0
};
var monstersCaught = 0;

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
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var collide = function() {
  if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
};

var update = function(modifier) {
  if (38 in keysDown) { //up
    if (hero.y > 32)
      hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { //down
    if (hero.y < canvas.height - 64)
      hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) { //left
    if (hero.x > 32)
      hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) { //right
    if (hero.x < canvas.width - 64)
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
  if(monsterImage.complete) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
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
