var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running,  mario_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  mario_running = loadAnimation("mario.png","mario2.png");
  mario_collided = loadAnimation("mariotriste.png");
  
 // groundImage = loadImage("ground2.png");
  

  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  
  
 // restartImg = loadImage("restart.png")
  //gameOverImg = loadImage("gameOver.png")
  
  
}

function setup() {
  createCanvas(600, 200);

  
  mario = createSprite(50,160,20,50);
  mario_running.addAnimation("running", mario_running);
  mario_collided.addAnimation("collided", mario_collided);
  
mario.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2; 
  ground.visible = false; 
  
  //gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
  //restart = createSprite(300,140);
  //restart.addImage(restartImg);
  
 
 // gameOver.scale = 0.5;
  //restart.scale = 0.5;
  
 // invisibleGround = createSprite(200,190,400,10);
  //invisibleGround.visible = false; 
  
  //criar Grupos de Obstáculos e Nuvens
  obstaclesGroup = createGroup();
  

  mario.setCollider("rectangle",0,0,mario.width,mario.height);
  mario.debug = false ; 
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //exibir pontuação
  text("Pontuação: "+ score, 500,50);
  
  
  if(gameState === PLAY){

   // gameOver.visible = false;
  //  restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //pontuação
    score = score + Math.round(getFrameRate()/60);

    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //pular quando barra de espaço é pressionada
    if(keyDown("space")&& mario.y >= 100) {
        mario.velocityY = -12;

    }
    
    //adicionar gravidade
    mario.velocityY = mario.velocityY + 0.8
  
  
    //gerar obstáculos no chão
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(mario)){
        //mario.velocityY = -12;
        gameState = END;
       
      
    }
  }
   else if (gameState === END) {
      //gameOver.visible = true;
      //restart.visible = true;
     
     //mudar a animação de trex
      mario.changeAnimation("collided", mario_collided);
    
     
     
      ground.velocityX = 0;
      mario.velocityY = 0
      
     
      //definir tempo de vida dos objetos do jogo para que eles nunca sejam destruídos
    obstaclesGroup.setLifetimeEach(-1);
 
     obstaclesGroup.setVelocityXEach(0);
       
   }
  
 
  //impedir que trex caia
  mario.collide(ground);
  
 // if(mousePressedOver(restart)) {
  //    reset();

  //  }


 // drawSprites();
}

/*function reset(){
 gameState = PLAY ; 
 //gameOver.visible = false; 
 //restart. visible = false; 
 obstaclesGroup.destroyEach() ; 
 score = 0 ; 
 mario.changeAnimation ("running", mario_running) ; 


} */


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
    
      default: break;
    }
   
    //atribuir dimensão e tempo de vida ao obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //acrescentar cada obstáculo ao grupo
    obstaclesGroup.add(obstacle);
 }
}

