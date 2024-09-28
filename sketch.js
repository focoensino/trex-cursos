var trex,trexCorrendo,chao,imagemChao,subchao,nuvem,imagemNuvem,cacto,escolherCacto,tempoJogo,imagemFim, imagemReiniciar;

 var imagemCacto1,imagemCacto2,imagemCacto3,
 imagemCacto4,imagemCacto5,imagemCacto6;

 var trexColidiu,fimDeJogo,reniciar;

var somPulo, somMorrendo, somCheckPoint;

 
 const jogar = 1;
const encerrar = 0;
var estadoJogo=jogar;
 
function preload(){
 trexColidiu=loadAnimation('trex_collided.png')
  trexCorrendo=loadAnimation('trex1.png','trex2.png','trex3.png')
  imagemChao=loadImage('ground2.png')
  
  imagemNuvem = loadImage('cloud.png')
  

  
  imagemCacto1 = loadImage('obstacle1.png')
  imagemCacto2 = loadImage('obstacle2.png')
  imagemCacto3 = loadImage('obstacle3.png')
  imagemCacto4 = loadImage('obstacle4.png')
  imagemCacto5 = loadImage('obstacle5.png')
  imagemCacto6 = loadImage('obstacle6.png')
  
  imagemFim = loadImage('gameOver.png')
  imagemReniciar = loadImage('restart.png')
  
  somPulo = loadSound('jump.mp3')
  somMorrendo = loadSound ('die.mp3')
  somCheckPoint = loadSound ('checkPoint.mp3')
  
}



function setup() {
createCanvas(600,200)
  trex = createSprite(50,100,20,40)
  trex.addAnimation('correndo',trexCorrendo)
  trex.addAnimation('colidiu',trexColidiu)
  trex.scale=0.5
  
  chao = createSprite(200,180,500,10)
  chao.addAnimation('chao',imagemChao)
  
  subchao = createSprite(200,190,500,10)
  subchao.visible =false
  
  fimDeJogo = createSprite (300,80,30,30)
  fimDeJogo.addAnimation('fimDeJogo',imagemFim)
  fimDeJogo.scale = 0.5
  reiniciar = createSprite (300,120,30,30)
  reiniciar.addAnimation('reiniciar',imagemReniciar)
  reiniciar.scale = 0.5
  
  tempoJogo=0
  
  trex.setCollider('circle',0,0,40)
  trex.debug=true
  
  grupoDeCactos = new Group();
  grupoDeNuvens = new Group();
  
}

function draw() {
  
  background(180)
  text("tempo: " + tempoJogo,500,30)
  
    trex.velocityY=trex.velocityY + 0.5
  trex.collide(subchao)

  if(estadoJogo==jogar){
    
   tempoJogo=tempoJogo +1
    
    fimDeJogo.visible = false
    reiniciar.visible = false
    
     chao.velocityX= -(2 + tempoJogo /100)
    
    if(chao.x < 0){
    chao.x =200
    chao.x =chao.width/2
    }

    
    if(keyDown('space')&& trex.y > 161){
    trex.velocityY= -10
    somPulo.play()    

  }
    
  }else if(estadoJogo==encerrar){ 
    chao.velocityX=0    
    
    fimDeJogo.visible = true
    reiniciar.visible = true
    
    
    grupoDeNuvens.setVelocityXEach(0);
    grupoDeCactos.setVelocityXEach(0);
    
    grupoDeCactos.setLifetimeEach(-1);
    grupoDeNuvens.setLifetimeEach(-1);
    
    trex.changeAnimation('colidiu',trexColidiu)
    trex.velocityY=0;
    
   
    
    if(tempoJogo > 0 && tempoJogo % 100 == 0){
      somCheckPoint.play()
      
    }
    
    
    
    
  } 
 
  if(grupoDeCactos.isTouching(trex)){
    estadoJogo=encerrar;
    somMorrendo.play()
  
    
 }
    gerarNuvens()
  gerarCactos()
  
   if (mousePressedOver(reiniciar)){
    restart()  

    }
    drawSprites()

}
function gerarNuvens(){
  if(frameCount % 60==0){
  nuvem = createSprite(600,100,50,10)
  nuvem.velocityX = -4
    nuvem.addAnimation('nuvempassando',imagemNuvem)
 nuvem.y = Math. round(random(60,100))
    
  nuvem.depth = trex.depth
    grupoDeNuvens.add(nuvem)
  trex.depth = trex.depth + 1
  nuvem.scale =0.4
  }
}
function gerarCactos(){
  if (frameCount % 60 == 0){
  cacto = createSprite(600,165,10,40)
  cacto.velocityX = -(3 + tempoJogo / 100)
    
  escolherCacto = Math.round(random(1,6))
  
    switch(escolherCacto){
      case 1:cacto.addImage(imagemCacto1)
break;
     case 2:cacto.addImage(imagemCacto2)
break;
     case 3:cacto.addImage(imagemCacto3)
break;
    case 4:cacto.addImage(imagemCacto4)
break;    
    case 5:cacto.addImage(imagemCacto5)
break; 
   case 6:cacto.addImage(imagemCacto6)
break;

default : break;


 }
    
    cacto.scale=0.4
    cacto.lifetime=300;
    grupoDeCactos.add(cacto);
    nuvem.scale=0.4
    nuvem.lifetime=300
   
  }
  
}

function restart(){
tempoJogo = 0
  estadoJogo = jogar
  fimDeJogo.visible = false;
  reiniciar.visible = false;
  
  grupoDeCactos.destroyEach()
  grupoDeNuvens.destroyEach()
  trex.changeAnimation('correndo',trexCorrendo)
}
  
  
