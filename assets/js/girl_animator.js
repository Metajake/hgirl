

 const girl_animator = new Object();
  girl_animator.canJump=0;

girl_animator.startIdle = function(){
    girl.idle.play();
};

girl_animator.fixJumpAnimation = function () {
  if(girl.sprite.animations.currentAnim.name !== 'bounce' && !girl.hitPlatform){
    girl.bounce.play();
  }else if (!girl.isJumping && !controls.moveLeft.isDown && !controls.moveRight.isDown){
    girl.idle.play();
  }
};

girl_animator.addJumpAnimation = function (){

controls.jump.onDown.add(function(){
  girl.bounce.onComplete.add(function(){
        if(!girl.isJumping){

          if(controls.moveLeft.isDown || controls.moveRight.isDown && !controls.jump.isDown ){
            girl.accel.play();
          }else{
            girl.idle.play();
          }

        }else{

          girl.bounce.play();

        }
      });

      if(girl_animator.canJump==0){
      girl_animator.canJump=1;
      girl.bounce.play();
      game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){girl_animator.canJump=0;},this);
      }



    });

};


girl_animator.addRightAnimation = function (){

controls.moveRight.onDown.add(function(){
      if(!girl.isJumping){
      girl.accel.onComplete.add(function(){girl.walk.play();}, this);
      girl.accel.play();
    }

    });
    controls.moveRight.onUp.add(function(){
      if(!controls.moveLeft.isDown && !girl.isJumping){
        girl.decel.onComplete.add(function(){
          girl.idle.play();
        }, this);
        girl.decel.play();
      }
    });
};


girl_animator.addLeftAnimation = function (){

    controls.moveLeft.onDown.add(function(){
      if(!girl.isJumping){
      girl.accel.onComplete.add(function(){girl.walk.play();}, this);
      girl.accel.play();
    }
    });
    controls.moveLeft.onUp.add(function(){
      if(!controls.moveRight.isDown&& !girl.isJumping){
        girl.decel.onComplete.add(function(){
          girl.idle.play();
        }, this);
        girl.decel.play();
      }
    });

};
