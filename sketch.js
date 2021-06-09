var ground,Bground;
var player,player_running,player_jumping;

var obs1,obs2,obs3,obs4,obs5;

var coin,coinGroup,coinImg;
var score = 0;
var heart1,heart2,heart3,life;
var heart = 3;
var deathCount;
var restart,gameover,restartImg;

var gameState = "start";
var coinsound,deadsound,bgsound,jumpsound;


function preload(){
  player_running = loadAnimation("Player/1.png","Player/2.png","Player/3.png","Player/4.png"
  ,"Player/5.png","Player/6.png","Player/7.png","Player/8.png","Player/9.png","Player/10.png");

  player_rolling = loadAnimation("Player/11.png","Player/12.png","Player/13.png","Player/14.png"
  ,"Player/15.png","Player/16.png","Player/17.png","Player/18.png")

  coinImg = loadAnimation("Points/1.png","Points/2.png","Points/3.png","Points/4.png","Points/5.png"
  ,"Points/6.png")

  bg = loadImage("bgg.png");
  gameover = loadImage("bg2.jpg");

  
  obs1 = loadAnimation("Obstacle1/tile000.png","Obstacle1/tile001.png","Obstacle1/tile002.png",
  "Obstacle1/tile003.png");
  obs2 = loadImage("knife.png");
  obs3 = loadAnimation("crow1/1.png","crow1/2.png","crow1/3.png","crow1/4.png");
  obs4 = loadAnimation("crow2/1.png","crow2/2.png","crow2/3.png","crow2/4.png");

  life = loadAnimation("Heart/1.png","Heart/2.png","Heart/3.png","Heart/4.png","Heart/5.png"
  ,"Heart/6.png");

  restartImg = loadImage("restart.png");

  coinsound = loadSound("coin.wav");
  deadsound = loadSound("dead sound.wav");
  jumpsound = loadSound("jump sound.wav");
  bgsound = loadSound("backgroundsound.wav");

}
function setup(){
  createCanvas(800,600);

  Bground = createSprite(500,300,50,50);
  Bground.addImage(bg);

  ground = createSprite(500,470,1000,20);
  ground.shapeColor = "green";
  ground.visible = false;

  restart = createSprite(600,80,50,50);
  restart.addImage(restartImg);
  restart.scale = 0.25;


  player = createSprite(75,470,45,45);
  player.addAnimation("running",player_running);
  player.addAnimation("rolling",player_rolling);
  player.setCollider("circle",0,0,100);
  player.debug = false;
  player.scale = 0.5;

  heart1 = createSprite(100,100,50,50);
  heart1.addAnimation("Heart",life);
  heart1.scale = 0.75;
  heart2 = createSprite(170,100,50,50);
  heart2.addAnimation("Heart",life);
  heart2.scale = 0.75;
  heart3 = createSprite(240,100,50,50);
  heart3.addAnimation("Heart",life);
  heart3.scale = 0.75;

  coinG = new Group();
  obstaclesG = new Group();

  deathCount = 0;

  
}
function draw(){
  //story and rules
  if(gameState === "start"){
    background("black");
    textSize(20);
    fill("green"); 
    strokeWeight(2);
    stroke("red");
    text("THIS IS STORY OF A NINJA BOY WHO HAVE TO COLLECT GOLD COINS",80,140);
    text("TO SAVE HIS VILLAGE FROM THE ENEMY.YOU HAVE TO DESTROY ALL ",80,170);
    text("THE ENEMY AND COLLECT COINS AND GEMS.",80,200);
    text("THE RULES OF THIS GAME ARE AS FOLLOW:-",80,230);
    fill("orange"); 
    stroke("blue");
    text("YOU HAVE THREE LIVES",120,260);
    text("YOU HAVE TO COLLECT 5 GEMS",120,290)
    text("PRESS UP ARROW KEY TO JUMP",120,320);
    text("PRESS DOWN ARROW KEY TO COME BACK DOWN",120,350);
    text("PRESS SPACE KEY TO ROLL",120,380);
    text("PRESS P TO START :)",120,410);

    if(keyDown("p")){
      gameState = "play";
    }
  }
//play state
  if(gameState === "play"){
    
   //player colliding ground
   player.collide(ground);
   player.velocityY = player.velocityY + 0.5;
   //infiniy ground
   Bground.velocityX = -8;
  if(Bground.x<-4000){
    Bground.x=500;
  }  
    //jumping,rolling,coming down
  if(keyDown(UP_ARROW) && player.y>400){   
    player.velocityY = -18;
    player.changeAnimation("running",player_running);
    player.scale = 0.5;
    jumpsound.play();
  }
  if(keyDown(DOWN_ARROW)){   
    player.velocityY = 15;
  }
  if(keyDown("space")){   
    player.changeAnimation("rolling",player_rolling);
    player.scale = 0.35;
  }

  //destroying coins if player touches and score++
  for(var i=0 ;i<coinG.length; i++){
    if (coinG.get(i).isTouching(player)){
         score+=1
         coinG.get(i).destroy();
         coinsound.play();
    }
  }
  //increasing deathcount if player touches obstacles
  if(obstaclesG.isTouching(player)){
    deathCount = deathCount + 1;
    obstaclesG.destroyEach(); 
    deadsound.play();
 }
  //removing heart according deathcount
 if(deathCount === 1){
   heart3.visible = false;
 }
 if(deathCount === 2){
  heart2.visible = false;
}
if(deathCount === 3){
  heart1.visible = false;
 
}
 
  restart.visible = false;
  spawnCoin();
  spawnObstacles();
 
  drawSprites();
   //texting score
   textSize(24);
   fill("white");
   strokeWeight(2);
   stroke("black")
   text("COINS : " + score ,100,50);
 
  
  }
   if(gameState === "end"){
     
    background(gameover);
    restart.visible = true;
    
    

   if(mousePressedOver(restart)) {
     reset();
     
    }

   
  }

 
}

function reset(){
    

}
function spawnCoin(){
  var rand = Math.round(random(10,100));
  if (frameCount % rand === 0) {
      coin = createSprite(900,120,40,10);
      coin.y = Math.round(random(150,320));
      coin.addAnimation("coins",coinImg);
      coin.scale = 0.5;
      coin.velocityX = -8;
      
       //assign lifetime to the variable
      coin.lifetime = 200;  
    
      coin.depth=player.depth;
      player.depth=player.deph+1;
    
      
      coinG.add(coin);

  }
}

function spawnObstacles(){
  if(frameCount % 120 === 0){
    var obstacle = createSprite(900,random(220,360),20,20);
    obstacle.velocityX = -8;
    obstacle.setCollider("circle",0,0,100);
    obstacle.debug  = true;
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addAnimation("fireball",obs1);
              break;
      case 2: obstacle.addImage(obs2);
              break;
      case 3: obstacle.addAnimation("black crow",obs3);
              break;        
      case 4: obstacle.addAnimation("red crow",obs4);
              break;
        

      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.75;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstaclesG.add(obstacle);
   }
}