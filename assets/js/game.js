var game = new Phaser.Game(
  1200,
  700,
  Phaser.CANVAS,
  'main',
  { preload: preload, create: create, update: update, render:render },
  false,
  false);


function preload() {

   asset_loader.loadAssets();
   
  
 }
function create() {
  
   
    game.forceSingleUpdate = true
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;
    girl_animator.startIdle();
    

}

function update(){


girl.isOnPlatform();
girl.jumping();
girl.walking();


}
function render(){

  game.debug.body(girl.sprite);
  game.debug.body(level_test.floor);
  game.debug.text("Controls: Left Arrow, Right Arrow, B, I", 32, 32);
}
