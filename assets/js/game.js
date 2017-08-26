const game = new Phaser.Game(
  GAMEWIN.totalWidth,
  GAMEWIN.totalHeight,
  Phaser.CANVAS,
  'main',
  { preload: preload, create: create, update: update, render:render },
  false,
  false
);

// THIS MUST BE GLOBAL FOR DEFINING GIRL(PLAYER)
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
  game.physics.arcade.gravity.y = 950;
  girl_animator.startIdle();

}

function update(){

  collisions();

  level_test.updateEnemys();
  girl.jumping();
  girl.walking();

}
function render(){
  game.debug.text(game.time.fps, 16, 16, "#00ff00");
  // game.debug.body(perv1.sprite);
  game.debug.body(girl.sprite);
  game.debug.body(level_test.floor);
  // game.debug.text("Controls: Left Arrow, Right Arrow, B, I", 32, 32);
  game.debug.text(girl.hitPlatform, 32, 48);
}

function collisions(){
  for(i=0;i<enemies.length;i++){
    game.physics.arcade.collide(enemies[i].sprite, level_test.platforms);
  }
  girl.hitPlatform = game.physics.arcade.collide(girl.sprite, level_test.platforms);
};
