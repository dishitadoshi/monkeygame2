
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var gameState = "play";
var bananaGroup, obstacleGroup;
var score;
var ground,groundImage;
var grass,grassImage;
var obstaclescore;
var gameover,gameoverImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  grassImage = loadImage("background.jpg");
  gameoverImage = loadImage("gameover.jpg");
}



function setup() {
  createCanvas(400, 400);
  
  score = 0;
  obstaclescore = 0;
  grass = createSprite(300,200,300,300);
  grass.scale = 0.7;
  grass.addImage(grassImage);
  grass.velocityX = -2;
  grass.x = grass.width/2;
  
  ground= createSprite(400,400,900,10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  monkey = createSprite(70,350,10,10);
 monkey.addAnimation("running",monkey_running);
 monkey.scale = 0.11;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  ground.visible = false;
 
}


function draw() {
background("black");
  if(gameState === "play"){
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if (grass.x < 0){
    grass.x = grass.width/2;
  }
  if(keyDown("space")){
   monkey.velocityY = -12; 
    }
  
  monkey.velocityY = monkey.velocityY +0.8;
  monkey.collide(ground);
  if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
  score = score+2;  
  }
  if(obstaclesGroup.isTouching(monkey)){
  obstaclesGroup.destroyEach();
  obstaclescore = obstaclescore+1;  
  }
  switch(score){
    case 10:monkey.scale = 0.12;
      break;
    case 20:monkey.scale = 0.14;
      break;
    case 30:monkey.scale = 0.16;
      break;
    case 40:monkey.scale = 0.18;
      break;
    default:break;
  }  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.11;
    obstaclesGroup.destroyEach();
  }
  
  foods();
  obstacles();
 drawSprites(); 
    fill("black");
  text ("score:"+score,300,40);
  text ("obstaclescore:"+obstaclescore,200,40);
    text(mouseX+","+mouseY,mouseX,mouseY);
  }
  if(gameState === "end"){
   fill("yellow");
    textSize(30);
    text("game over",100,250);
    
  }
  if(obstaclescore === 2){
   gameState = "end" ;
  }
  
  
  
   
}
function foods(){
  if (frameCount % 80 === 0){
    var banana = createSprite(400,200,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.y = Math.round(random(120,350));
    banana.lifetime = 120;
    bananaGroup.add(banana) ;
  } 
  
 
}
function obstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(400,200,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.scale = 0.1;
    obstacle.y =Math.round(random(120,300));
    obstacle.lifetime = 120;
    obstaclesGroup.add(obstacle)
  } 
  
}




