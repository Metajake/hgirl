
function update_function(){

console.log(girl_sprite.body.y);

  if(game.input.pointer1.isDown){
    girl_bounce.onComplete.add(function(){
      if(!keyB.isDown){
        girl_idle.play();
      }else{
        girl_bounce.play();
      }
    });
    girl_bounce.play();
  }


if(cursors.up.isDown && girl_sprite.body.y>=569 ){
  girl_sprite.body.velocity.y=-80;
}



  if(cursors.left.isDown && cursors.right.isDown )
{
    if(girl_two_keys_down==false)
  {

   if(girl_facing == 'left'){girl_sprite.scale.x = 1;}
   if(girl_facing == 'right'){girl_sprite.scale.x = -1;}
   }





   if(girl_facing == 'left'){girl_group.x += 3;}

   if(girl_facing == 'right'){girl_group.x -= 3;}

    girl_two_keys_down=true;

  
}
  else if(cursors.right.isDown){
   
if(girl_two_keys_down==true)
  {girl_sprite.scale.x = +1;}

    if(girl_facing == 'left'){
      girl_sprite.scale.x = +1;
      girl_facing = 'right';
    }
    // girlLaunch.play(null,null,true );
    // girlSprite.animations.play('walk');

    // girlSprite.position.x += 3;
    girl_group.x += 3;
    girl_two_keys_down=false;
  }else if(cursors.left.isDown){
    
if(girl_two_keys_down==true)
  {girl_sprite.scale.x = -1;}

    if(girl_facing == 'right'){
      girl_sprite.scale.x = -1;
      girl_facing = 'left';
    }

    // girlSprite.animations.play('walk');
    girl_group.x -= 3;
    girl_two_keys_down=false;
  }
}
