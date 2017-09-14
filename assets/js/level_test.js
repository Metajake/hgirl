const level_test = new Object();


level_test.enviroment= game.add.group();
level_test.platforms = game.add.group();
level_test.platforms.enableBody = true;
level_test.layer= game.add.group();


// BG 1
level_test.bg0 = game.add.tileSprite(0,0,GAMEWIN.totalWidth, window.innerHeight, 'bg_space');
level_test.layer.add(level_test.bg0);
level_test.enviroment.add(level_test.bg0);

// BG 2
level_test.bg1 = game.add.tileSprite(0,0,GAMEWIN.totalWidth, GAMEWIN.totalHeight, 'bg_trees');
level_test.layer.add(level_test.bg1);
level_test.enviroment.add(level_test.bg1);

// BG 3
level_test.bg2 = game.add.tileSprite(0,0,GAMEWIN.totalWidth, GAMEWIN.totalHeight, 'bg_buildingInt');
level_test.layer.add(level_test.bg2);
level_test.enviroment.add(level_test.bg2);

// FLOOR
level_test.floor= game.add.tileSprite(-600,GAMEWIN.floorHeight,2400, 50,'floor');

// FLOOR GROUPS
level_test.layer.add(level_test.floor);
level_test.enviroment.add(level_test.floor);
level_test.platforms.add(level_test.floor);

// FLOOR PHYSICS
game.physics.arcade.enable(level_test.floor, Phaser.Physics.ARCADE);
level_test.floor.body.immovable = true;
level_test.floor.body.allowGravity = false;

// TABLE
level_test.table = game.add.sprite(0,0,'table');
level_test.table.scale.setTo(game.spriteScale);
level_test.table.position.y = GAMEWIN.floorHeight - level_test.table.height;

// TABLE GROUPS
level_test.layer.add(level_test.table);
level_test.enviroment.add(level_test.table);
level_test.platforms.add(level_test.table);

// TABLE PHYSICS
level_test.table.body.immovable=true;
level_test.table.body.allowGravity=false;

// ENEMIES
level_test.enemies = [];

level_test.enemies[0] = new pervert(0,0,0,0.5);
level_test.enemies[1] = new pervert(1,GAMEWIN.totalWidth,0,0.5);
level_test.enemies[2] = new pervert(2,GAMEWIN.totalWidth + 100,0,0.5);

level_test.updateEnemies= function(){
  for(i=0;i<level_test.enemies.length;i++){
    level_test.enemies[i].update();
  }
};

level_test.destroyOneEnemy= function(ID){
  for(i=ID;i+1<level_test.enemies.length;i++){
    
    level_test.enemies[i]=level_test.enemies[i+1];
    level_test.enemies[i].ID-=1;
  }
};
