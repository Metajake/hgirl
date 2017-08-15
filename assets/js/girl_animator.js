
  
 const girl_animator = new Object(); 
  girl_animator.canJump=0;

girl_animator.startIdle = function(){
    girl.idle.play();
}

girl_animator.addJumpAnimation = function (){

controls.jump.onDown.add(function(){
      
       

        girl.bounce.onComplete.add(function(){
        if(girl.onPlatform==true){
          
if(controls.moveLeft.isDown || controls.moveRight.isDown && !controls.jump.isDown )
{girl.accel.play();}else{girl.idle.play();}
       
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
      if(girl.onPlatform==true){
      girl.accel.onComplete.add(function(){girl.walk.play();}, this);
      girl.accel.play();
    }

    });
    controls.moveRight.onUp.add(function(){
      if(!controls.moveLeft.isDown && girl.onPlatform==true){
        girl.decel.onComplete.add(function(){
          girl.idle.play();
        }, this);
        girl.decel.play();
      }
    });
};


girl_animator.addLeftAnimation = function (){
    
    controls.moveLeft.onDown.add(function(){
      if(girl.onPlatform==true){
      girl.accel.onComplete.add(function(){girl.walk.play();}, this);
      girl.accel.play();
    }
    });
    controls.moveLeft.onUp.add(function(){
      if(!controls.moveRight.isDown&& girl.onPlatform==true){
        girl.decel.onComplete.add(function(){
          girl.idle.play();
        }, this);
        girl.decel.play();
      }
    });

};
   
    


  
    





   

