//0 = menu
//1 = play
//2 = load
//5 = end
//variable here
var pc, pcImg;
var gamestate = 0
var play, quit, btn;
var fireballs, ballImg;
var enemy, enemyImg, boomImg;
var enemysGroup, funsGroup;
var score = 0;
var fun, funImg;
var lifeX, lifeXImg;
var he2, he1, he3, heImg
var hearts = 2
var dg;
var shoots;
var blast, blastImg;
var rl, rlImg;
var shootbtn, shootImg;
var loading, loadingGif;
var load = 0
var percent = 5
var points
var prev;
var save;
var reseths;
var shop;
var slogo, buynow1, buynow2, buynow3, buynow4;
var sk1, sk2, sk3, sk1Img, sk2Img, sk3Img
var backbtn;

var fireballsGroup;
function preload() {
  bg = loadImage("images/bg.jpg");
  pcImg = loadImage("images/ufo.png");
  ballImg = loadImage("images/fireball.png");
  enemyImg = loadImage("images/enemy.png");
  boomImg = loadImage("images/boom.png");
  funImg = loadImage("images/gift.png");
  lifeXImg = loadImage("images/life.png");
  heImg = loadImage("images/heart.png");
  mainImg = loadImage("images/bg0.jpg");
  blastImg = loadImage("images/boom.png");
  btn = loadImage("images/btn.png");
  rlImg = loadImage("images/rel.jpg");
  shootImg = loadImage("images/shootbtn.png");
  sk1Img = loadImage("images/sk1.png");
  sk2Img = loadImage("images/sk2.png");
  sk3Img = loadImage("images/sk3.png");

  // sImg = loadImage("images/slogo.png")


  shoots = loadSound("shoo.mp3");

  loadingGif = loadAnimation("loading/1.jpg", "loading/2.jpg", "loading/3.jpg", "loading/4.jpg", "loading/5.jpg", "loading/6.jpg", "loading/7.jpg", "loading/8.jpg", "loading/9.jpg", "loading/10.jpg", "loading/11.jpg", "loading/12.jpg", "loading/13.jpg", "loading/14.jpg", "loading/15.jpg", "loading/16.jpg", "loading/17.jpg")
  // loadingGif.looping = false;
  loadingGif.playing = false;
}
function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile === true) {
    createCanvas(displayWidth, displayHeight);
    shootbtn.visible = true;
  } else {
    createCanvas(windowWidth, windowHeight);
  }

  if (localStorage['highscore'] === undefined) {
    localStorage['highscore'] = 0
  }

  if (localStorage['inventory'] === undefined) {
    localStorage['inventory'] = "null"
  }

  //if (localStorage['skins'] === undefined) {
  // localStorage['skins'] = "null"
  //}


  pc = createSprite(width / 2, 650, 20, 20);
  pc.addImage("og", pcImg);
  pc.addImage("sk1", sk1Img);
  pc.addImage("sk2", sk2Img);
  pc.addImage("sk3", sk3Img);
  pc.changeImage("og")
  pc.scale = 0.5;
  pc.visible = false

  shootbtn = createSprite(width - 300, 500, 20, 20);
  shootbtn.addImage(shootImg);
  shootbtn.scale = 0.5;
  shootbtn.visible = false;

  he1 = createSprite(100, 200);
  he1.addImage(heImg);
  he1.scale = 0.2
  he1.visible = false

  he2 = createSprite(100, 300);
  he2.addImage(heImg);
  he2.scale = 0.2
  he2.visible = false

  he3 = createSprite(100, 400);
  he3.addImage(heImg);
  he3.scale = 0.2
  he3.visible = false

  /*prev = createButton("load");
  prev.position(300, 300);
  prev.size(200, 50);

  save = createButton("save");
  save.position(300, 500);
  save.size(200, 50);*/

  blast = createSprite(2000, 100000,);
  blast.addImage(blastImg);
  blast.scale = 0.5

  play = createButton("play");
  play.position(width / 2 - 120, 425);
  play.size(300, 60)
  play.class("customButton")


  backbtn = createButton("back");
  backbtn.position(width / 2 - 200, 800);
  backbtn.size(300, 60)
  backbtn.class("customButton")
  backbtn.hide();

  shop = createButton("shop");
  shop.position(width / 2 - 120, 815);
  shop.size(300, 60)
  shop.class("customButton")

  slogo = createImg("images/slogo.png");
  slogo.position(width / 2 - 170, 0);
  slogo.size(400, 300)
  slogo.hide();


  sk1 = createImg("images/sk1.png");
  sk1.position(200, 300);
  sk1.size(400, 300)
  sk1.hide();

  buynow1 = createImg("images/buynow.png");
  buynow1.position(230, 530);
  buynow1.size(300, 200);
  buynow1.hide()

  sk2 = createImg("images/sk2.png");
  sk2.position(700, 300);
  sk2.size(400, 300)
  sk2.hide();

  buynow2 = createImg("images/buynow.png");
  buynow2.position(730, 530);
  buynow2.size(300, 200)
  buynow2.hide();


  sk3 = createImg("images/sk3.png");
  sk3.position(1150, 300);
  sk3.size(400, 300)
  sk3.hide();

  buynow3 = createImg("images/buynow.png");
  buynow3.position(1200, 530);
  buynow3.size(300, 200)
  buynow3.hide();

  reseths = createButton("reset High Score");
  reseths.position(width / 2 - 120, 715);
  reseths.size(300, 60)
  reseths.class("customButton")
  reseths.visible = true;

  rl = createSprite(100, 100)
  rl.addImage(rlImg);
  rl.scale = 0.3
  rl.visible = false;

  quit = createButton("quit");
  quit.position(width / 2 - 120, 515);
  quit.size(300, 60)
  quit.class("customButton")



  quit.mousePressed(() => {
    window.location.reload()
  });

  buynow1.mousePressed(() => {
    if (localStorage['highscore'] > 599) {
      localStorage['highscore'] -= 600
      localStorage['inventory'] += 185
      pc.scale = 1
    }

  });

  buynow2.mousePressed(() => {

    localStorage['inventory'] = 0

    if (localStorage['highscore'] > 999) {
      localStorage['highscore'] -= 1000
      localStorage['inventory'] += 420

    }
  });

  buynow3.mousePressed(() => {
    localStorage['inventory'] = 0

    if (localStorage['highscore'] > 1499) {
      localStorage['highscore'] -= 1500
      localStorage['inventory'] += 143
      pc.scale = 1
    }
  });


  backbtn.mousePressed(() => {
    window.location.reload();
  });

  play.mousePressed(() => {
    play.hide();
    quit.hide();
    gamestate = 2

  });

  shop.mousePressed(() => {
    gamestate = 3;

  });

  reseths.mousePressed(() => {
    swal({
      title: `ARE YOU SURE TO DELETE YOUR HIGH SCORE ` + localStorage['highscore'],
      text: "your high score will become 0 and yow wont be able to buy skins in shop and you cant get back your score",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnjQLVyrLnarmshPxjQfj-9YyPjFw2I1h-Q&usqp=CAU",
      imageSize: "100x100",
      confirmButtonText: "I am sure to delete it"
    }, function (isConfirm) {
      if (isConfirm === true) {
        localStorage['highscore'] = 0
        window.location.reload();
      }
    })
  });



  enemysGroup = new Group();
  funsGroup = new Group();
  fireballsGroup = new Group();
  shop.hide();

}



function draw() {
  background(bg);


  buySystem()
  buySystem2()
  buySystem3()


  if (gamestate === 0) {
    background(mainImg);
    shop.show();
    textSize(30);
    fill("black");
    stroke("white");
    strokeWeight(2);
    text("use your mouse to move the player", width / 3, 600);
    text("use left mouse button to shoot enemy and collect treasure", width / 3 - 175, 650);

    text("HighScore : " + localStorage['highscore'], 1500, 200)
  }

  if (gamestate === 2) {
    background("black");
    fill("white");
    rect(width / 2 - 200, height / 2, 300, 50);
    load += 3
    percent += 1

    fill("green");
    rect(width / 2 - 195, height / 2 + 5, load, 40);

    reseths.hide();
    textSize(30);
    text("loading...", width / 2 - 50, height / 2 - 50);
    text(percent + "%", width / 2 + 150, height / 2 + 50);

    if (load >= 285) {

      gamestate = 1
    }
  }
  if (gamestate === 3) {
    background("white");
    play.hide();
    quit.hide();
    reseths.hide();
    shop.hide();

    // pc.visible = true

    sk1.show();
    sk2.show();
    sk3.show();

    slogo.show();

    buynow1.show();
    buynow2.show();
    buynow3.show();

    backbtn.show();

    textSize(30)
    text("HighScore : " + localStorage['highscore'], 1500, 200)
    //prices
    fill("black")
    text("price is 600", 230, 700)
    text("price is 1000", 730, 700)
    text("price is 1400", 1200, 700)


  }
  if (gamestate === 5) {
    // funsGroup.setVelocityYEach = 0
    // enemysGroup.setVelocityYEach = 0
    he1.destroy();
    pc.destroy();
    enemysGroup.setVelocityYEach(0);
    swal({
      title: `Awesome! you have got a score of ` + score,
      text: "You Have ben robbed by enemy's",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Play Again"
    }, function (isConfirm) {
      if (isConfirm === true) {
        window.location.reload();
      }
    })
    if (localStorage['highscore'] < score) {
      localStorage['highscore'] = score
    }
    reseths.hide();
  }
  if (gamestate === 1) {


    pc.visible = true
    he1.visible = true
    he2.visible = true
    he3.visible = true
    rl.visible = true
    reseths.hide();
    shop.hide();

    pc.x = World.mouseX;
    pc.y = World.mouseY;

    shoot();
    spawnEnemy()
    spawnfun()


    fill("white")
    textSize(30);
    text("Score: " + score, 1500, 100)
    text("HighScore : " + localStorage['highscore'], 1500, 200)




    for (var i = 0; i < enemysGroup.length; i++) {
      for (var j = 0; j < fireballsGroup.length; j++) {
        if (enemysGroup.get(i).isTouching(fireballsGroup.get(j))) {
          score += 5;
          points += 1;


          enemysGroup.get(i).changeImage("blast");
          enemysGroup.get(i).scale = 0.5;
          enemysGroup.get(i).velocityY = 0;
          enemysGroup.get(i).lifetime = 20;
          fireballsGroup.get(j).destroy();

        }
      }
    }

    if (localStorage['highscore'] < score) {
      localStorage['highscore'] = score
    }

    if (mousePressedOver(rl)) {
      window.location.reload();
    }




    for (var i = 0; i < funsGroup.length; i++) {
      for (var j = 0; j < fireballsGroup.length; j++) {
        if (funsGroup.get(i).isTouching(fireballsGroup.get(j))) {
          score += 70;
          points += 5;
          funsGroup.get(i).destroy();
          fireballsGroup.get(j).destroy();

        }
      }
    }

    if (enemysGroup.collide(pc)) {
      he3.destroy();
      enemysGroup.destroyEach();
      hearts = hearts - 1
      console.log("game over")


        ;


    }

    if (hearts < 1) {
      he2.destroy()
    }

    if (hearts < 0) {
      gamestate = 5
    }
  }




  drawSprites();
}
function shoot() {
  if (mouseWentDown("leftButton")) {
    spawnfireballs();
    shoots.play();
    shoots.setVolume(0.3);
    touches = [];
  }
}
function spawnEnemy() {
  if (frameCount % Math.round(random(10, 100)) === 0) {
    x = random(200, 1400);
    y = random(-20, -100)

    var enemy = createSprite(x, y);
    enemy.addImage("enemy", enemyImg);
    enemy.addImage("blast", blastImg);
    enemy.velocityY += (5 + getFrameRate() / 60)
    enemy.lifetime = 300
    enemysGroup.add(enemy)
    enemy.setCollider("rectangle", 0, 1, 80, 130);
  }

}
function spawnfun() {
  if (frameCount % 700 === 0) {
    x = random(200, 1400);
    y = random(-20, -100)

    var fun = createSprite(x, y);
    fun.addImage(funImg);
    fun.velocityY += (5 + getFrameRate() / 60)
    fun.lifetime = 300
    funsGroup.add(fun)
  }
}

function spawnfireballs() {

  x = pc.x;
  y = pc.y;

  var fireball = createSprite(x, y);
  fireball.addImage(ballImg);
  fireball.velocityY = -150;
  fireball.lifetime = 300;
  fireball.scale = 0.2;
  fireballsGroup.add(fireball);

}
function buySystem() {
  if (localStorage['highscore'] < 0) {
    localStorage['highscore'] = 0
  }

  if (localStorage['inventory'] === "0185") {
    pc.changeImage("sk1")
  }

  if (localStorage['inventory'] < 1) {
    pc.changeImage("og")
  }

  if (localStorage['inventory'] === "0185185") {
    swal({
      title: `you have already bought the skin`,
      text: "You Have bought the skin",
      imageUrl:
        "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png",
      imageSize: "100x100",
      confirmButtonText: "ok"
    }, function (isConfirm) {
      if (isConfirm === true) {
        window.location.reload();

      }
    })
    localStorage['inventory'] -= 1

  }
  pc.scale = 1
}
function buySystem2() {
  if (localStorage['highscore'] < 0) {
    localStorage['highscore'] = 0
  }

  if (localStorage['inventory'] === "0420") {
    pc.changeImage("sk2")
  }

  if (localStorage['inventory'] < 1) {
    pc.changeImage("og")
  }

  if (localStorage['inventory'] === "0420420") {
    swal({
      title: `you have already bought the skin`,
      text: "You Have bought the skin",
      imageUrl:
        "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png",
      imageSize: "100x100",
      confirmButtonText: "ok"
    }, function (isConfirm) {
      if (isConfirm === true) {
        window.location.reload();

      }
    })
    localStorage['inventory'] -= 1

  }
  pc.scale = 1
}
function buySystem3() {
  if (localStorage['highscore'] < 0) {
    localStorage['highscore'] = 0
  }

  if (localStorage['inventory'] === "0143") {
    pc.changeImage("sk3")
  }

  if (localStorage['inventory'] < 1) {
    pc.changeImage("og")
  }

  if (localStorage['inventory'] === "0143143") {
    swal({
      title: `you have already bought the skin`,
      text: "You Have bought the skin",
      imageUrl:
        "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png",
      imageSize: "100x100",
      confirmButtonText: "ok"
    }, function (isConfirm) {
      if (isConfirm === true) {
        window.location.reload();

      }
    })
    localStorage['inventory'] -= 1

  }
  pc.scale = 1
}