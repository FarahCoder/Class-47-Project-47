var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3;
var restartImg,gameOverImg;
var topObstaclesGroup, bottomObstaclesGroup, barGroup;
var restart,gameOver;
var score = 0;

//definition of gamestate
var PLAY = 1;
var END = 0;
var gameState = PLAY


function preload(){
bgImg = loadImage("assets/bg.png");

balloonImg = loadImage("assets/Balloon.png");

obsTop1 = loadImage("assets/Obstacle.png");
obsTop2 = loadImage("assets/obsTop2.png");

obsBottom1 = loadImage("assets/obsBottom1.png");
obsBottom2 = loadImage("assets/obsBottom2.png");
obsBottom3 = loadImage("assets/obsBottom3.png");
restartImg = loadImage("assets/restart.png");
gameOverImg = loadImage("assets/gameOver.png");

}

function setup(){

  createCanvas(400,400);
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.07;

balloon.debug = true;

//creating groups for obstacles
topObstaclesGroup = new Group ();
bottomObstaclesGroup = new Group ();
barGroup = new Group ();

// creating gameOver and restart sprite
gameOver = createSprite(220,200);
restart = createSprite(220,240);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;
restart.addImage(restartImg);
restart.scale=0.5;
gameOver.visible = false;
restart.visible = false


}

function draw() {
  
  background("black");
        
          if(gameState === PLAY) {
            
            //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
           
          Bar();
          
          //spawning top and bottom obstacles
          spawnObstaclesTop();
          spawnObstaclesBottom();

          if(topObstaclesGroup.isTouching(balloon) ||
          balloon.isTouching(topGround)

         || balloon.isTouching(bottomGround) ||
         bottomObstaclesGroup.isTouching(balloon)){
          gameState = END;
          
         }
          }


          if(gameState === END) {
            gameOver.visible = true;
            restart.visible = true;
            gameOver.depth +=1;
            restart.depth +=1;

            balloon.velocityX = 0;
            balloon.velocityY = 0;
            topObstaclesGroup.setVelocityXEach(0);
            bottomObstaclesGroup.setVelocityXEach(0);
            barGroup.setVelocityXEach(0);
            topObstaclesGroup.setLifetimeEach(-1);
            bottomObstaclesGroup.setLifetimeEach(-1);
            balloon.y = 200;
            if(mousePressedOver(restart)) {
              reset();
            }
          }
          
   
        drawSprites();
       Score();
        
      

      
}

function reset() {
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
topObstaclesGroup.destroyEach();
bottomObstaclesGroup.destroyEach();
score = 0;
}

function spawnObstaclesTop() 
{
if(World.frameCount%60===0) {
  obstacleTop = createSprite(400,50,40,50);
  obstacleTop.scale=0.15;
  obstacleTop.velocityX=-4;
  var rand=Math.round(random(1,2));

  switch(rand) {
    case 1: obstacleTop.addImage(obsTop1);
    break;
    case 2: obstacleTop.addImage(obsTop2);
    break;
    default:
    break;
  }

  obstacleTop.lifetime = 100;
  balloon.depth += 1;
  topObstaclesGroup.add(obstacleTop);
  
}  
}

function spawnObstaclesBottom() 
{
if(World.frameCount%80===0) {
  obstacleBottom = createSprite(400,320,40,50);
  obstacleBottom.scale=0.07;
  obstacleBottom.velocityX=-4;
  var rand=Math.round(random(1,3));

  switch(rand) {
    case 1: obstacleBottom.addImage(obsBottom1);
    break;
    case 2: obstacleBottom.addImage(obsBottom2);
    break;
    case 3: obstacleBottom.addImage(obsBottom3);
    break;
    default:
    break;
  }
  bottomObstaclesGroup.add(obstacleBottom);
  obstacleBottom.lifetime = 100;
  balloon.depth += 1;
  
}  
}
 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
          barGroup.add(bar);
         }
}

function Score () {

  if(balloon.isTouching(barGroup)) {
    score +=1;

  }

  textFont("algerian");
  textSize(30);
  fill("yellow");
  text("Score: "+ score, 250, 50);
}
  
