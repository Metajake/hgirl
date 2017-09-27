const game = new Phaser.Game(
  GAMEWIN.totalWidth,
  GAMEWIN.totalHeight,
  Phaser.CANVAS,
  'main',
  {preload: preload, create: create, update: update, render: render},
  false,
  false
);

// THIS MUST BE GLOBAL TO DEFINE GIRL(PLAYER)
// BUT IT IS VERY SPECIFIC TO THE LEVEL.
// (MAYBE WE RELOCATE IT LATER...)
// GAME SPRITE SIZE SCALE
game.spriteScale = 3;

function preload() {
  asset_loader.loadAssets();
};

function create() {
  game.state.start("stateMainMenu")
  // Set Advanced Timing for FPS debugging
  game.time.advancedTiming = true;

  // game.forceSingleUpdate = true

};

function update(){

};

function render(){

  //----------- DEBUG BELOW THIS LINE XD ---------------//>
  // game.debug.text("FPS: " + game.time.fps, 16, 16, "#00ff00");
  // // game.debug.body(perv1.sprite);
  // // game.debug.body(girl.sprite);
  // game.debug.body(level_test.floor);
  // game.debug.body(level_test.table);
  // // game.debug.text("Controls: Left Arrow, Right Arrow, B, I", 32, 32);
  // game.debug.text(girl.hitPlatform, 32, 48);
  //----------- DEBUG ABOVE THIS LINE :| ---------------//>
};

// game.state.add("level", gameState);
// game.state.start("level");
