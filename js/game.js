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
    girl.sprite = game.add.sprite(0,0, 'girl');
    girl.sit = game.make.sprite(0,0, 'girlSit');
    girl.sit.visible = false;
    girl.state = 'idle';

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

    game.physics.arcade.enable(girl.sprite);
    game.physics.arcade.enable(girl.sit);
    girl.sprite.body.collideWorldBounds = true;
    // game.physics.arcade.enable(upper);

    girl.group = game.add.group();
    girl.group.x = 100;
    girl.group.y = 200;
    // girlGroup.enableBodyDebug = true;
    // girlGroup.enableBody = true;
    // girlGroup.physicsBodyType = Phaser.Physics.ARCADE;
    girl.group.add(girl.sprite);
    girl.group.add(girl.sit);
    // girlGroup.x = 100;
    // cl(girlGroup.x)

    girl.sprite.anchor.setTo(.5,.5);
    girl.sit.anchor.setTo(.5,.5);
    girl.facing = 'right';
    girl.group.scale.setTo(3);

    // Log Spritesheet Json object
    // girlIdleJson = game.cache.getJSON('girl2Json');
    // girlWalkJson = game.cache.getJSON('girlWalkJson');
    girl.json = game.cache.getJSON('girlJson');
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
    var girlIdleArray = getAnimArray(girl.json,[0,1,2,3,4,5,6]);
    var girlWalkArray = getAnimArray(girl.json,[12,13,14,15,16,17]);
    var girlAccelArray = getAnimArray(girl.json,[8,9,10,11]);
    var girlSlowAccelArray = getAnimArray(girl.json,[8,11]);
    var girlDecelArray = getAnimArray(girl.json,[11,8]);
    var girlBounceArray = getAnimArray(girl.json,[18,19,20,21,22,23,24]);
    // cl(girlAccelArray);

    // idle = girlIdle.animations.add('idle');
    // idle2 = girlIdle.animations.add('idle2',girlIdleAnimArray,40, true);
    // walk = girlWalk.animations.add('walk',girlWalkAnimArray,40, true);
    girl.idle = girl.sprite.animations.add('idle', girlIdleArray,/*FPS speed*/ 40,/*loop*/ true);
    girl.walk = girl.sprite.animations.add('walk', girlWalkArray,/*FPS speed*/ 40,/*loop*/ true);
    girl.accel = girl.sprite.animations.add('accel', girlAccelArray,/*FPS speed*/ 40);
    girl.decel = girl.sprite.animations.add('decel', girlDecelArray,/*FPS speed*/ 40);
    girl.bounce = girl.sprite.animations.add('bounce', girlBounceArray, /*FPS speed*/ 40);

    //Test OnLoop
    // girlIdle.onLoop.add(function(){cl("Idle Loop")}, this);

    girl.idle.play();

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
      girl.accel.onComplete.add(function(){girl.walk.play();}, this);
      girl.accel.play();
    });
    keyRight.onUp.add(function(){
      if(!keyLeft.isDown){
        girl.decel.onComplete.add(function(){
          girl.idle.play();
        }, this);
        girl.decel.play();
      }
    });
    keyLeft.onDown.add(function(){
      girl.accel.onComplete.add(function(){girl.walk.play();}, this);
      girl.accel.play();
    });
    keyLeft.onUp.add(function(){
      if(!keyRight.isDown){
        girl.decel.onComplete.add(function(){
          girl.idle.play();
        }, this);
        girl.decel.play();
      }
    });
    keyB.onDown.add(function(){
      girl.bounce.onComplete.add(function(){
        if(!keyB.isDown){
          girl.idle.play();
        }else{
          girl.bounce.play();
        }
      });
      girl.bounce.play();
    });
    keyI.onDown.add(function(){
      if(girl.state !== 'seated'){
        girl.state = 'seated';
        girl.sprite.visible = false;
        girl.sit.visible = true;
      }else{
        girl.state = 'idle';
        girl.sprite.visible = true;
        girl.sit.visible = false;
      }

      girl.idle.play();
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
