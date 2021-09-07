/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle,ground,groundImage;

var obstaclesGroup, shrubsGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

//creating kangaroo
  
  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(50,100,20,50);
  
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.setCollider("CIRCLE",0,0,300)
  kangaroo.scale = 0.15;

  
  
  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  kangaroo.x = camera.position.x-270;
  
  if(gameState === PLAY){
  
    if(keyDown("space") && kangaroo.y >= 159) {
      kangaroo.velocityY = -12;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8
    jungle.velocity.x =-3
  
    if (jungle.x < 100){
      jungle.x = 400;
    }

    
   kangaroo.collide(invisibleGround);
   spawnshrubsGroup();
    spawnObstacles();
  
    if (shrubsGroup.isTouching(kangaroo)){
        shrubsGroup.destroyEach();
    }

    if (obstaclesGroup.isTouching(kangaroo)){
      //collideSound.play();
      gameState = END;
    }
  }
  
  else if (gameState === END) {
   
    //set velcity of each game object to 0
    jungle.velocityX = 0;
    kangaroo.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);
    
    //change the kangaroo animation
    kangaroo.changeAnimation("collided",kangaroo_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
   
  }
  

  drawSprites();

}


function spawnshrubsGroup() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var shrub = createSprite(800,350,40,10);
  // shrub.y = Math.round(random(80,120));
    //shrub.addImage(shrub1Image);
    var ran = Math.round(random(1,3))
    switch(ran){
    case 1:shrub.addImage(shrub1)
    break;

    case 2:shrub.addImage(shrub2)
    break;

    case 3:shrub.addImage(shrub3)
    break;
    
    }
    shrub.scale = 0.05;
    shrub.velocityX = -(6 + 3*score/100);
    shrub.setCollider("RECTANGLE",0,0,shrub.width/2,shrub.height/2)    
     //assign lifetime to the variable
    shrub.lifetime = 200;
    
    //adjust the depth
   shrub .depth = kangaroo.depth;
    kangaroo.depth = kangaroo.depth + 1;
    
    //add each cloud to the group
    shrubsGroup.add(shrub);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(800,350,10,40);
    stone.addImage( obstacle1 )
    //stone.debug = true;
    stone.velocityX = -(6 + 3*score/100);
    stone.setCollider("RECTANGLE",0,0,200,200)    
    
    //assign scale and lifetime to the stone          
    stone.scale = 0.1;
    stone.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(stone);
  }
}


