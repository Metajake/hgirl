const Level = {
  preload: function(){
    cl("Level Preloaded!");
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    levelContent.create();
    girl.create();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 2500;

    girl_animator.startIdle();
  },
  update: function(){
    collisions();

    levelContent.updateEnemies();

    girl.boobFlash();
    girl.jumping();
    girl.walking();
    girl_animator.fixJumpAnimation();

    // Background Day Time Change
    levelContent.bg0.tilePosition.y -= .01;
  },
  render: function(){
    // RENDER ENEMY HITPOINTS
    enemyRender();
  }
}

game.state.add("stateLevel", Level);

function collisions(){
  for(i=0;i<levelContent.enemies.length;i++){
    game.physics.arcade.collide(levelContent.enemies[i].sprite, levelContent.platforms);
  }
  girl.hitPlatform = game.physics.arcade.collide(girl.sprite, levelContent.platforms);
};

function enemyRender(){

  for(i=0;i<levelContent.enemies.length;i++){
    if(levelContent.enemies[i].dead==false){
      game.debug.text(
        levelContent.enemies[i].life,
        levelContent.enemies[i].sprite.body.x+35,
        levelContent.enemies[i].sprite.body.y-20
      );
    }
  }
};
