var gameState = "play";

var tower,towerImages
var door ,doorImage,doorGroup;
var climber,climber_Image,climberGroup;
var ghost ,ghost_standing ,ghost_jumping;
var invisible_block,invisible_group;

var spookySound;

function preload(){
  towerImages = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghost_standing = loadImage("ghost-standing.png");
  ghost_jumping = loadImage("ghost-jumping.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImages);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghost_standing);
  ghost.scale = 0.3;
  ghost.velocityY = 10;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisible_group = new Group();
}

function draw(){
  background(0);
  if(gameState === "play"){

  if(tower.y > 400){
    tower.y = 300;
  }
  if(keyDown("left")){
    ghost.x = ghost.x-4;
  }
  if(keyDown("right")){
    ghost.x = ghost.x+4;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;    
  }
  
  ghost.velocityY = ghost.velocityY+0.5;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisible_group.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }
  spawn_doors();
  
  drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(25);
    text("GAME OVER",230,230);
  }
}

function spawn_doors(){
  if(frameCount%250 === 0){
    
    var door = createSprite(200,-50);
    door.addImage(doorImage);
    door.x = Math.round(random(120,400));
    
    var climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    
    var invisible_block = createSprite(200,15);
    invisible_block.width = climber.width;
    invisible_block.height = 2;
    invisible_block.x = door.x;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisible_block.lifetime = 800;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisible_block.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisible_group.add(invisible_block);
  }
}