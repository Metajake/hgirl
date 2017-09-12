const pervert = function(x,y,speed,radius){

  this.sprite = game.add.sprite(x, y, 'pervert');

  this.sprite.position.y = GAMEWIN.floorHeight - (this.sprite.height + y);

  level_test.layer.add(this.sprite);
  this.alive =true;
  game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.anchor.setTo(.5,.5);
  this.sprite.scale.setTo(1.5);

  this.speed=speed;
  this.radius=radius;
  this.seeGirl=false;

  this.follow = function (){
    if(girl.sprite.body.x - 3*-this.speed>this.x)
      {this.sprite.scale.x = 1.5;
      this.sprite.body.x += 3*this.speed;
    }

    if(girl.sprite.body.x + 3*-this.speed<this.x){
      this.sprite.scale.x = -1.5;
      this.sprite.body.x += 3*-this.speed;
    }
  };

  this.awareness =  function (){
      if(Math.abs(girl.sprite.body.x-this.x)<= this.radius){

      this.sprite.tint= 0xff0000;
      seeGirl=true;
      this.follow();

      }else{

      this.sprite.tint= 0xffffff;
      seeGirl=false;

      }
  };

  this.getPosition = function(){
    this.x= this.sprite.body.x;
    this.y= this.sprite.body.y;
  };

  this.update = function(){
    this.getPosition();
    this.awareness();
  };

};
