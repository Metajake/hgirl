
  
 const girl_animator = new Object(); 
   

girl_animator.startIdle = function(){
    girl.idle.play();
}

girl_animator.addJumpAnimation = function (){

controls.jump.onDown.add(function(){
      
        girl.bounce.onComplete.add(function(){
        if(girl.sprite.body.y>=569 ){
          
if(controls.moveLeft.isDown || controls.moveRight.isDown  )
{girl.accel.play();}else{girl.idle.play();}

        }else{
          girl.bounce.play();
        }
      });
      girl.bounce.play();
    });
    
};


girl_animator.addRightAnimation = function (){

controls.moveRight.onDown.add(function(){
      if(girl.sprite.body.y>=569){
      girl.accel.onComplete.add(function(){girl.walk.play();}, this);
      girl.accel.play();
    }

    });
    controls.moveRight.onUp.add(function(){
      if(!controls.moveLeft.isDown && girl.sprite.body.y>=569){
        girl.decel.onComplete.add(function(){
          girl.idle.play();
        }, this);
        girl.decel.play();
      }
    });
};


girl_animator.addLeftAnimation = function (){
    
    controls.moveLeft.onDown.add(function(){
      if(girl.sprite.body.y>=569){
      girl.accel.onComplete.add(function(){girl.walk.play();}, this);
      girl.accel.play();
    }
    });
    controls.moveLeft.onUp.add(function(){
      if(!controls.moveRight.isDown&& girl.sprite.body.y>=569){
        girl.decel.onComplete.add(function(){
          girl.idle.play();
        }, this);
        girl.decel.play();
      }
    });

};
   
    


  
    





   

