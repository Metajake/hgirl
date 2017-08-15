
    
 const girl = new Object();  
 
    girl.sprite = game.add.sprite(0,0, 'girl');
    girl.sit = game.make.sprite(0,0, 'girlSit');
    girl.sit.visible = false;
   
    girl.state = 'idle';
   
    girl.twoKeysDown=false;
    
    game.physics.arcade.enable(girl.sprite);
    game.physics.arcade.enable(girl.sit);         

    girl.group = game.add.group();
    girl.group.x = 100;
    girl.group.y = 500;
    girl.group.add(girl.sprite);
    girl.group.add(girl.sit);
    level_test.layer.add(girl.group);
    
    girl.sprite.anchor.setTo(.5,.5);
    girl.sit.anchor.setTo(.5,.5);
    girl.facing = 'right'
    girl.group.scale.setTo(3);
    girl.sprite.body.setSize(66, 130,2, 0);
    girl.onPlatform=true;
    girl.sprite.body.collideWorldBounds=true;


    
    
    
    girl.json = game.cache.getJSON('girlJson');
   
    girl.girlIdleArray = frame_converter.getAnimArray(girl.json,[0,1,2,3,4,5,6]);
    girl.girlWalkArray = frame_converter.getAnimArray(girl.json,[12,13,14,15,16,17]);
    girl.girlAccelArray = frame_converter.getAnimArray(girl.json,[8,9,10,11]);
    girl.girlSlowAccelArray = frame_converter.getAnimArray(girl.json,[8,11]);
    girl.girlDecelArray = frame_converter.getAnimArray(girl.json,[11,8]);
    girl.girlBounceArray = frame_converter.getAnimArray(girl.json,[18,19,20,21,22,23,24]);

    girl.idle = girl.sprite.animations.add('idle', girl.girlIdleArray,/*FPS speed*/ 40,/*loop*/ true);
    girl.walk = girl.sprite.animations.add('walk',girl.girlWalkArray,/*FPS speed*/ 40,/*loop*/ true);
    girl.accel = girl.sprite.animations.add('accel', girl.girlAccelArray,/*FPS speed*/ 40);
    girl.decel = girl.sprite.animations.add('decel', girl.girlDecelArray,/*FPS speed*/ 40);
    girl.bounce = girl.sprite.animations.add('bounce',girl.girlBounceArray, /*FPS speed*/ 40);

    girl_animator.addJumpAnimation();
    girl_animator.addLeftAnimation();
    girl_animator.addRightAnimation();
    girl.falsecount=0;
    girl.truecount=0;
    


 

 girl.isOnPlatform = function ()
{
    plattformCollision= game.physics.arcade.collide(girl.group, level_test.platforms);
    

if(plattformCollision)
      {
        girl.truecount+=1
        girl.onPlatform=true;

      }
      else{ 
        
        girl.falsecount+=1;
       }
    

if(girl.truecount>=3)
{

girl.onPlatform=true;
girl.truecount=0;
girl.falsecount=0;
}

if( girl.falsecount>=3)
{

girl.onPlatform=false;
girl.truecount=0;
girl.falsecount=0;
}
}

 girl.jumping = function ()
{

    if(controls.jump.isDown && girl.onPlatform==true){
  girl.sprite.body.velocity.y = -80;
}
};

girl.walking = function ()
{
 if(controls.moveLeft.isDown && controls.moveRight.isDown )
{
    if(controls.two_keys_down==false)
  {

   if(girl.facing == 'left'){girl.sprite.scale.x = 1;}
   if(girl.facing == 'right'){girl.sprite.scale.x = -1;}
   }

  if(girl.facing == 'left'){girl.group.x += 3;}

   if(girl.facing == 'right'){girl.group.x -= 3;}

    controls.two_keys_down=true;

}
  else if(controls.moveRight.isDown ){
   
if(controls.two_keys_down==true)
  {girl.sprite.scale.x = +1;}

    if(girl.facing == 'left'){
      girl.sprite.scale.x = +1;
      girl.facing = 'right';
    }
 
    girl.group.x += 3;
    controls.two_keys_down=false;
  }else if(controls.moveLeft.isDown  ){
    
if(controls.two_keys_down==true)
  {girl.sprite.scale.x = -1;}

    if(girl.facing == 'right'){
      girl.sprite.scale.x = -1;
      girl.facing = 'left';
    }

    girl.group.x -= 3;
    controls.two_keys_down=false;
  }
};
   





   

