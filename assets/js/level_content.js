const levelContent = new Object();

levelContent.create = function(){
  levelContent.enviroment= game.add.group();
  levelContent.platforms = game.add.group();
  levelContent.platforms.enableBody = true;
  levelContent.layer = game.add.group();

  // BG 1
  levelContent.bg0 = game.add.tileSprite(0,0,GAMEWIN.totalWidth, window.innerHeight, 'bg_space');
  levelContent.layer.add(levelContent.bg0);
  levelContent.enviroment.add(levelContent.bg0);

  // BG 2
  levelContent.bg1 = game.add.tileSprite(0,0,GAMEWIN.totalWidth, GAMEWIN.totalHeight, 'bg_trees');
  levelContent.layer.add(levelContent.bg1);
  levelContent.enviroment.add(levelContent.bg1);

  // BG 3
  levelContent.bg2 = game.add.tileSprite(0,0,GAMEWIN.totalWidth, GAMEWIN.totalHeight, 'bg_buildingInt');
  levelContent.layer.add(levelContent.bg2);
  levelContent.enviroment.add(levelContent.bg2);

  // FLOOR
  levelContent.floor= game.add.tileSprite(-600,GAMEWIN.floorHeight,2400, 50,'floor');

  // FLOOR GROUPS
  levelContent.layer.add(levelContent.floor);
  levelContent.enviroment.add(levelContent.floor);
  levelContent.platforms.add(levelContent.floor);

  // FLOOR PHYSICS
  game.physics.arcade.enable(levelContent.floor, Phaser.Physics.ARCADE);
  levelContent.floor.body.immovable = true;
  levelContent.floor.body.allowGravity = false;

  // ENEMIES
  levelContent.enemies = [];

  levelContent.enemies[0] = new pervert(0,0,0,0.5);
  levelContent.enemies[1] = new pervert(1,GAMEWIN.totalWidth,0,0.5);
  levelContent.enemies[2] = new pervert(2,GAMEWIN.totalWidth + 100,0,0.5);

  levelContent.updateEnemies= function(){
    for(i=0;i<levelContent.enemies.length;i++){
      levelContent.enemies[i].update();
    }
  };

}
//
// // TABLE
// levelContent.table = game.add.sprite(0,0,'table');
// levelContent.table.scale.setTo(game.spriteScale);
// levelContent.table.position.y = GAMEWIN.floorHeight - levelContent.table.height;
//
// // TABLE GROUPS
// levelContent.layer.add(levelContent.table);
// levelContent.enviroment.add(levelContent.table);
// levelContent.platforms.add(levelContent.table);
//
// // TABLE PHYSICS
// levelContent.table.body.immovable=true;
// levelContent.table.body.allowGravity=false;
//
// levelContent.destroyOneEnemy= function(ID){
//   for(i=ID;i+1<levelContent.enemies.length;i++){
//
//     levelContent.enemies[i]=levelContent.enemies[i+1];
//     levelContent.enemies[i].ID-=1;
//   }
// };
