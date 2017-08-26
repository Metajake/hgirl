// Create Girl Object
const girl = new Object();

// Create Girl Sprites
girl.sprite = game.add.sprite(0,0, 'girl');
girl.sit = game.make.sprite(0,0, 'girlSit');

// Sit Sprite Invisible
girl.sit.visible = false;

//Enable Physics
game.physics.arcade.enable(girl.sprite, Phaser.Physics.ARCADE);
game.physics.arcade.enable(girl.sit, Phaser.Physics.ARCADE);

// Create Group for All Girl Sprites Position Transformations
// Add Sprites to Group
girl.group = game.add.group();
girl.group.add(girl.sprite);
girl.group.add(girl.sit);

// Add Girl Group to Layer Collision Group
level_test.layer.add(girl.group);

// Set Girl Spawn Location
girl.group.x = 100;
girl.group.y = GAMEWIN.floorHeight - (girl.sprite.body.height + 30);
// girl.group.y = GAMEWIN.floorHeight;

// Set Girl "Physical" Properties
girl.facing = 'right'
girl.isJumping = false;
girl.jumpHeight=830;
girl.speed= 4.5;

// Center Girl Anchor
girl.sprite.anchor.setTo(.5,.5);
girl.sit.anchor.setTo(.5,.5);

// Increase Girl Sprite Size
girl.sprite.scale.setTo(game.spriteScale);
// girl.sprite.body.setSize(66, 130);

//Update Collision Properties
// girl.sprite.body.position.y -= 100;

// Define Girl Animation JSON
girl.json = game.cache.getJSON('girlJson');

// Get Converted Animation Frame Arrays
girl.girlIdleArray = frame_converter.getAnimArray(girl.json,[0,1,2,3,4,5,6]);
girl.girlWalkArray = frame_converter.getAnimArray(girl.json,[12,13,14,15,16,17]);
girl.girlAccelArray = frame_converter.getAnimArray(girl.json,[8,9,10,11]);
girl.girlSlowAccelArray = frame_converter.getAnimArray(girl.json,[8,11]);
girl.girlDecelArray = frame_converter.getAnimArray(girl.json,[11,8]);
girl.girlBounceArray = frame_converter.getAnimArray(girl.json,[18,19,20,21,22,23,24]);

// Define Girl Animations
girl.idle = girl.sprite.animations.add('idle', girl.girlIdleArray,/*FPS speed*/ 40,/*loop*/ true);
girl.walk = girl.sprite.animations.add('walk',girl.girlWalkArray,/*FPS speed*/ 40,/*loop*/ true);
girl.accel = girl.sprite.animations.add('accel', girl.girlAccelArray,/*FPS speed*/ 40);
girl.decel = girl.sprite.animations.add('decel', girl.girlDecelArray,/*FPS speed*/ 40);
girl.bounce = girl.sprite.animations.add('bounce',girl.girlBounceArray, /*FPS speed*/ 40);

// Add Animations
girl_animator.addJumpAnimation();
girl_animator.addLeftAnimation();
girl_animator.addRightAnimation();

// Girl Jump Update Function (on Game Loop)
girl.jumping = function () {
  if(controls.jump.isDown && girl.sprite.body.touching.down){
    girl.sprite.body.velocity.y = -girl.jumpHeight;
  }
  if(!girl.sprite.body.wasTouching.down){
    girl.isJumping = true;
  }else{
    girl.isJumping = false;
  }

  // if(girl.hitPlatform /* && girl.isJumping*/){
  //   // cl("jump");
  //   girl.isJumping = false;
  //   girl_animator.fixJumpAnimation();
  //   // cl("yo");
  // }
};


// Girl Walk Update Function
girl.walking = function () {
  if(controls.moveLeft.isDown && controls.moveRight.isDown ) {
    if(controls.two_keys_down == false) {
      if(girl.facing == 'left'){
        girl.sprite.scale.x = game.spriteScale;
      }
      if(girl.facing == 'right'){
        girl.sprite.scale.x = -game.spriteScale;
      }
    }

    if(girl.facing == 'left'){
      girl.group.x += girl.speed;
    }

    if(girl.facing == 'right'){
      girl.group.x -= girl.speed;
    }

    controls.two_keys_down = true;

  } else if(controls.moveRight.isDown ){
    if(controls.two_keys_down == true) {
      girl.sprite.scale.x = game.spriteScale;
    }

    if(girl.facing == 'left'){
      girl.sprite.scale.x = game.spriteScale;
      girl.facing = 'right';
    }

    girl.group.x += girl.speed;
    controls.two_keys_down = false;
  } else if(controls.moveLeft.isDown ){
    if(controls.two_keys_down == true) {
      girl.sprite.scale.x = -game.spriteScale;
    }

    if(girl.facing == 'right'){
      girl.sprite.scale.x = -game.spriteScale;
      girl.facing = 'left';
    }

    girl.group.x -= girl.speed;
    controls.two_keys_down = false;
  }
};
