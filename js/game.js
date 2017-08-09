var game = new Phaser.Game(
  800,
  600,
  Phaser.CANVAS,
  'main',
  { preload: preload, create: create, update: update, render:render },
  false,
  false);


function preload() {

    //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load

    // game.load.spritesheet('girl', 'Sprite-0004.png', 64, 64);
    game.load.spritesheet('girl', 'assets/media/girl.png', 64, 64);
    game.load.spritesheet('girlSit', 'assets/media/girl_sit.png', 64, 64);

    game.load.json('girlJson', 'assets/girl.json');
    game.load.json('girlSitJson', 'assets/girl_sit.json');

}

function create() {
    // game.time.advancedTiming = true;
    // game.time.desiredFPS = 30;
    game.forceSingleUpdate = true

    cursors = game.input.keyboard.createCursorKeys();
    keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyB = game.input.keyboard.addKey(Phaser.Keyboard.B);
    keyI = game.input.keyboard.addKey(Phaser.Keyboard.I);

    touch = game.input.addPointer();

    // girlIdle = game.add.sprite(40, 40, 'girlIdle');
    // girlWalk = game.add.sprite(40, 40, 'girlWalk');
    // girlWalk.visible = false;
    girl_sprite = game.add.sprite(0,0, 'girl');
    girl_sit = game.make.sprite(0,0, 'girlSit');
    girl_sit.visible = false;
    girl_state = 'idle';
    girl_two_keys_down=false;

    // cl(game.add)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // CODE FOR Fillsed bitmapData Square
    // var bmd = game.add.bitmapData(86, 86);
    // bmd.context.createLinearGradient(0, 0, 0, 32);
    // var grd = bmd.context.createLinearGradient(0, 0, 0, 32);
    // grd.addColorStop(0, '#8ED6FF');
    // grd.addColorStop(1, '#004CB3');
    // bmd.context.fillStyle = grd;
    // bmd.context.fillRect(0, 0, 32, 32);

    // Add BMD to Cache (give it a key)
    // game.cache.addBitmapData('blueShade', bmd);
    // upper = game.add.sprite(8, 8, game.cache.getBitmapData('blueShade'));

    game.physics.arcade.enable(girl_sprite);
    game.physics.arcade.enable(girl_sit);
    girl_sprite.body.collideWorldBounds = true;
    // game.physics.arcade.enable(upper);

    girl_group = game.add.group();
    girl_group.x = 100;
    girl_group.y = 200;
    // girlGroup.enableBodyDebug = true;
    // girlGroup.enableBody = true;
    // girlGroup.physicsBodyType = Phaser.Physics.ARCADE;
    girl_group.add(girl_sprite);
    girl_group.add(girl_sit);
    // girlGroup.x = 100;
    // cl(girlGroup.x)

    girl_sprite.anchor.setTo(.5,.5);
    girl_sit.anchor.setTo(.5,.5);
    girl_facing = 'right';
    girl_group.scale.setTo(3);

    // Log Spritesheet Json object
    // girlIdleJson = game.cache.getJSON('girl2Json');
    // girlWalkJson = game.cache.getJSON('girlWalkJson');
    girl_json = game.cache.getJSON('girlJson');
    // cl(girlIdleJson.frames)

    //Example of For In {object}
    // for ( var item in girlIdleJson.frames){
    //   // cl(item);
    //   if (girlIdleJson.frames.hasOwnProperty(item)){
    //     // cl(phaserJSON.frames[item].duration*.01);
    //     // cl(phaserJSON.frames[item].duration);
    //   }
    // };

    // var girlIdleAnimArray = getAnimArray(girlIdleJson);
    // var girlWalkAnimArray = getAnimArray(girlWalkJson);
    var girlIdleArray = getAnimArray(girl_json,[0,1,2,3,4,5,6]);
    var girlWalkArray = getAnimArray(girl_json,[12,13,14,15,16,17]);
    var girlAccelArray = getAnimArray(girl_json,[8,9,10,11]);
    var girlSlowAccelArray = getAnimArray(girl_json,[8,11]);
    var girlDecelArray = getAnimArray(girl_json,[11,8]);
    var girlBounceArray = getAnimArray(girl_json,[18,19,20,21,22,23,24]);
    // cl(girlAccelArray);

    // idle = girlIdle.animations.add('idle');
    // idle2 = girlIdle.animations.add('idle2',girlIdleAnimArray,40, true);
    // walk = girlWalk.animations.add('walk',girlWalkAnimArray,40, true);
    girl_idle = girl_sprite.animations.add('idle', girlIdleArray,/*FPS speed*/ 40,/*loop*/ true);
    girl_walk = girl_sprite.animations.add('walk', girlWalkArray,/*FPS speed*/ 40,/*loop*/ true);
    girl_accel = girl_sprite.animations.add('accel', girlAccelArray,/*FPS speed*/ 40);
    girl_decel = girl_sprite.animations.add('decel', girlDecelArray,/*FPS speed*/ 40);
    girl_bounce = girl_sprite.animations.add('bounce', girlBounceArray, /*FPS speed*/ 40);

    //Test OnLoop
    // girlIdle.onLoop.add(function(){cl("Idle Loop")}, this);

    girl_idle.play();

    var arrr = [0,"yo","timmy",null,undefined,5,["yo","yo"]]
    cl("Rand: "+game.rnd.pick(arrr))

    // idle.enableUpdate = true;
    // idle.onUpdate.add(onUpdate, this);

    // tween = game.add.tween(girlIdle);
    // tweenData = new Phaser.TweenData(tween);

    // cl(tweenData.value)

    // tween.to({x:7}, 1000, 'Linear', true, 0);
    // game.add.tween(sprite).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);

    keyRight.onDown.add(function(){
      girl_accel.onComplete.add(function(){girl_walk.play();}, this);
      girl_accel.play();
    });
    keyRight.onUp.add(function(){
      if(!keyLeft.isDown){
        girl_decel.onComplete.add(function(){
          girl_idle.play();
        }, this);
        girl_decel.play();
      }
    });
    keyLeft.onDown.add(function(){
      girl_accel.onComplete.add(function(){girl_walk.play();}, this);
      girl_accel.play();
    });
    keyLeft.onUp.add(function(){
      if(!keyRight.isDown){
        girl_decel.onComplete.add(function(){
          girl_idle.play();
        }, this);
        girl_decel.play();
      }
    });
    keyB.onDown.add(function(){
      girl_bounce.onComplete.add(function(){
        if(!keyB.isDown){
          girl_idle.play();
        }else{
          girl_bounce.play();
        }
      });
      girl_bounce.play();
    });
    keyI.onDown.add(function(){
      if(girl_state !== 'seated'){
        girl_state = 'seated';
        girl_sprite.visible = false;
        girl_sit.visible = true;
      }else{
        girl_state = 'idle';
        girl_sprite.visible = true;
        girl_sit.visible = false;
      }

      girl_idle.play();
    });
}

function update(){
  update_function();
}

function render(){
  // game.debug.text("debug", 32, 32);
  // game.debug.bodyInfo(girlGroup, 32, 32);
  // game.debug.body(girlSprite);
  // game.debug.body(upper);
  // game.debug.text("Mobile? "+window.mobileAndTabletcheck(), 32, 32);
  game.debug.text("Controls: Left Arrow, Right Arrow, B, I", 32, 32);
}
