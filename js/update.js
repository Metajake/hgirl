
function update_function(){

  if(game.input.pointer1.isDown){
    girl.bounce.onComplete.add(function(){
      if(!keyB.isDown){
        girl.idle.play();
      }else{
        girl.bounce.play();
      }
    });
    girl.bounce.play();
  }
  if(cursors.right.isDown){
    if(girl.facing == 'left'){
      girl.sprite.scale.x *= -1;
      girl.facing = 'right';
    }
    // girlLaunch.play(null,null,true );
    // girlSprite.animations.play('walk');

    // girlSprite.position.x += 3;
    girl.group.x += 3;
  }else if(cursors.left.isDown){
    if(girl.facing == 'right'){
      girl.sprite.scale.x *= -1;
      girl.facing = 'left';
    }

    // girlSprite.animations.play('walk');
    girl.group.x -= 3;
  }else{
  }
}
