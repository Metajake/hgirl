// Create Girl Object
const girl = new Object();

// Create Girl Sprites
girl.sprite = game.add.sprite(0,0, 'girl');
girl.sit = game.make.sprite(0,0, 'girlSit');

// Sit Sprite Invisible
girl.sit.visible = false;

//Enable Physics
game.physics.arcade.enable(girl.sprite, Phaser.Physics.ARCADE);


// Create Group for All Girl Sprites Position Transformations
// Add Sprites to Group
girl.group = game.add.group();
girl.group.add(girl.sit);
girl.group.add(girl.sprite);


// Add Girl Group to Layer Collision Group
level_test.layer.add(girl.group);

// Set Girl Spawn Location
girl.group.x = GAMEWIN.totalWidth / 2;
girl.group.y = GAMEWIN.floorHeight - (girl.sprite.body.height + 30);
// girl.group.y = GAMEWIN.floorHeight;

// Set Girl MOVEMENT Properties
girl.facing = 'right'
girl.isJumping = false;
girl.jumpHeight=750;
girl.speed= 4.5;
girl.boobs= false;
girl.ableToFlash=false;

// SCALE Girl Sprite
girl.sprite.scale.setTo(game.spriteScale);
girl.sit.scale.setTo(game.spriteScale);

// Center Girl Anchor
girl.sprite.anchor.setTo(.5,.5);
girl.sit.anchor.setTo(.5,.5);

// girl.sprite.body.setSize(66, 130);

//Update COLLISION Properties
girl.sprite.body.width = 100;
girl.sprite.body.collideWorldBounds = true;
// Define Girl Animation JSON
girl.json = game.cache.getJSON('girlJson');

// Converted Frame Arrays
girl.girlIdleArray = frame_converter.getAnimArray(girl.json,[0,1,2,3,4,5,6]);
girl.girlWalkArray = frame_converter.getAnimArray(girl.json,[12,13,14,15,16,17]);
girl.girlAccelArray = frame_converter.getAnimArray(girl.json,[8,9,10,11]);
girl.girlSlowAccelArray = frame_converter.getAnimArray(girl.json,[8,11]);
girl.girlDecelArray = frame_converter.getAnimArray(girl.json,[11,8]);
girl.girlBounceArray = frame_converter.getAnimArray(girl.json,[18,19,20,21,22,23,24]);

// Girl Animations
girl.idle = girl.sprite.animations.add('idle', girl.girlIdleArray,/*FPS speed*/ 40,/*loop*/ true);
girl.walk = girl.sprite.animations.add('walk',girl.girlWalkArray,/*FPS speed*/ 40,/*loop*/ true);
girl.accel = girl.sprite.animations.add('accel', girl.girlAccelArray,/*FPS speed*/ 40);
girl.decel = girl.sprite.animations.add('decel', girl.girlDecelArray,/*FPS speed*/ 40);
girl.bounce = girl.sprite.animations.add('bounce',girl.girlBounceArray, /*FPS speed*/ 40);

// Add Animations
girl_animator.addJumpAnimation();
girl_animator.addLeftAnimation();
girl_animator.addRightAnimation();

// Game Loop Update: Girl Jump
girl.jumping = function () {
  if(controls.jump.isDown && girl.sprite.body.touching.down && girl.boobs==false){
    girl.sprite.body.velocity.y = -girl.jumpHeight;
    girl.sit.position=girl.sprite.position;
  }
  if(!girl.sprite.body.wasTouching.down){
    girl.isJumping = true;
  }else{
    girl.isJumping = false;
  }
};

girl.boobFlash = function () {
 if(controls.boobs.isDown && girl.sprite.body.touching.down && girl.ableToFlash==true){
  girl.boobs=true;
  girl.sprite.visible=false;
  girl.sit.visible=true;

 }else{ girl.boobs=false;
  girl.sprite.visible=true;
  girl.sit.visible=false;}
}

// Game Loop Update: Girl Walk
girl.walking = function () {
  if(controls.moveLeft.isDown && controls.moveRight.isDown && girl.boobs==false ) {
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

     // level_test.bg1.tilePosition.x -= .9;
    }

    if(girl.facing == 'right'){
      girl.group.x -= girl.speed;
    }

    controls.two_keys_down = true;

  } else if(controls.moveRight.isDown && girl.boobs==false ){

    // MOVE RIGHT
    if(controls.two_keys_down == true) {
      girl.sprite.scale.x = game.spriteScale;
    }

    if(girl.facing == 'left'){
      girl.sprite.scale.x = game.spriteScale;
      girl.facing = 'right';
    }

    controls.two_keys_down = false;

    girl.group.x += girl.speed;

    /* ENVIRONMENT REPOSITIONING
    level_test.bg1.tilePosition.x -= .9;
    level_test.bg2.tilePosition.x -= 2.5;
    level_test.table.position.x -= 5;
    for(i=0;i<enemies.length;i++){
      if(enemies[i].sprite.position.x > -100){
        enemies[i].sprite.position.x -= 5;
      }
    }*/

  } else if(controls.moveLeft.isDown && girl.boobs==false ){

    // MOVE LEFT
    if(controls.two_keys_down == true) {
      girl.sprite.scale.x = -game.spriteScale;
    }

    if(girl.facing == 'right'){
      girl.sprite.scale.x = -game.spriteScale;
      girl.facing = 'left';
    }

    controls.two_keys_down = false;

    girl.group.x -= girl.speed;

    /* ENVIRONMENT REPOSITIONING
    level_test.bg1.tilePosition.x += .9;
    level_test.bg2.tilePosition.x += 2.5;
    level_test.table.position.x += 5;
    for(i=0;i<enemies.length;i++){
      if(enemies[i].sprite.position.x < GAMEWIN.totalWidth + 100){
        enemies[i].sprite.position.x += 5;
      }
    }*/
  }
};
