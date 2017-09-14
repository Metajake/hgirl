const game = new Phaser.Game(
  GAMEWIN.totalWidth,
  GAMEWIN.totalHeight,
  Phaser.CANVAS,
  'main',
  { preload: preload, create: create, update: update, render:render },
  false,
  false
);

// THIS MUST BE GLOBAL TO DEFINE GIRL(PLAYER)
// BUT IT IS VERY SPECIFIC TO THE LEVEL.
// MAYBE WE RELOCATE IT LATER...
// GAME SPRITE SIZE SCALE

game.spriteScale = 3;

function preload() {
   asset_loader.loadAssets();
 }

function create() {
  // Set Advanced Timing for FPS debugging
  game.time.advancedTiming = true;

  game.forceSingleUpdate = true
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 2500;
  girl_animator.startIdle();

}

function update(){

  collisions();

  level_test.updateEnemies();

  girl.boobFlash();
  girl.jumping();
  girl.walking();
  girl_animator.fixJumpAnimation();

  // Background Day Time Change
  level_test.bg0.tilePosition.y -= .01;
console.log(level_test.enemies);
}
function render(){
  
  //----------- DEBUG BELOW THIS LINE XD ---------------//>
  game.debug.text("FPS: " + game.time.fps, 16, 16, "#00ff00");
  // game.debug.body(perv1.sprite);
  // game.debug.body(girl.sprite);
  game.debug.body(level_test.floor);
  game.debug.body(level_test.table);
  // game.debug.text("Controls: Left Arrow, Right Arrow, B, I", 32, 32);
  game.debug.text(girl.hitPlatform, 32, 48);
  enemyRender();
  //----------- DEBUG ABOVE THIS LINE :| ---------------//>

}

function enemyRender(){
  
  for(i=0;i<level_test.enemies.length;i++){
    if(level_test.enemies[i].dead==false)
    {
      game.debug.text(level_test.enemies[i].life, level_test.enemies[i].sprite.body.x+35, level_test.enemies[i].sprite.body.y-20);
    }
  }
  
};

function collisions(){
  for(i=0;i<level_test.enemies.length;i++){
    game.physics.arcade.collide(level_test.enemies[i].sprite, level_test.platforms);
  }
  girl.hitPlatform = game.physics.arcade.collide(girl.sprite, level_test.platforms);
};
