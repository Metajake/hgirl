const pervert = function(ID,x,y,speed){

  this.sprite = game.add.sprite(x, y, 'pervert');

  this.sprite.position.y = GAMEWIN.floorHeight - (this.sprite.height + y);

  level_test.layer.add(this.sprite);
  this.alive =true;
  game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);

  this.ID=ID;
  this.sprite.scale.setTo(1.5);
  this.sprite.anchor.setTo(.5,.5);
  this.speed=speed;
  this.followRadius=400;
  this.attackRadius=100;
  this.seeGirl=false;
  this.attackTime=2;
  this.isAttacking=false;
  this.maxLife=100;
  this.life=this.maxLife;
  this.stunned =false;
  this.dead= false;

  
  this.die= function(){
    if(this.life <0)
    {
     this.life=0;
    }
    if(this.life == 0 && girl.boobs == false)
    {
      this.sprite.destroy();
      this.dead=true;
      girl.ableToFlash=false;
      
    }
  }

  this.seeBoobs= function(){
    if(girl.boobs==true)
    {
     this.life-=1;
    this.stunned =true;
    }
    if(this.life<=this.maxLife && this.life>0 && girl.boobs == false && this.stunned ==true)
    {
      this.hit();
    }

  };

  this.follow = function (){
    if(girl.sprite.body.x+35>this.x)
      {this.sprite.scale.x = 1.5;
        
      this.sprite.body.x += 3*this.speed
    }

    if(girl.sprite.body.x+45<this.x){
      this.sprite.scale.x = -1.5;
      
      this.sprite.body.x += 3*-this.speed;
    }
  };

this.hit = function(){
  if(Math.abs(girl.sprite.body.x+50-this.x)<= this.attackRadius && girl.boobs==false && this.life !=0)

  {
   speed=3;
   girl.speed=0;
   girl.jumpHeight=0;
   this.attackRadius=0; 
   this.isAttacking=false;
  }
  this.followRadius=400;
  this.speed=speed;  
  this.isAttacking=false;
};


  this.awareness =  function (){
    if(Math.abs(girl.sprite.body.x+50-this.x)<= this.attackRadius)
    {
      if(this.isAttacking==false)
      {
        game.time.events.add(Phaser.Timer.SECOND * 2, this.hit,this);
      }
    girl.ableToFlash=true;
    this.sprite.tint=0x0000ff;
    this.isAttacking=true;
    this.followRadius=0;
    this.speed=0;
    this.seeBoobs();
    
    }else
    {

      if(Math.abs(girl.sprite.body.x-this.x)<= this.followRadius)
      {

        this.sprite.tint= 0xff0000;
        seeGirl=true;
        this.follow();
 
      }else
      {
        if(this.isAttacking==false)
        {
        this.sprite.tint= 0xffffff;
        seeGirl=false;
        }
      }
    }
  };
 



  this.getPosition = function(){
    this.x= this.sprite.body.x;
    this.y= this.sprite.body.y;
  };

  this.update = function(){
    if(this.dead==false)
    {
      this.getPosition();
      this.awareness();
      this.die();
    }
  };

};
