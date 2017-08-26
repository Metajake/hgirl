const level_test = new Object();


level_test.enviroment= game.add.group();
level_test.platforms = game.add.group();
level_test.platforms.enableBody = true;
level_test.layer= game.add.group();




level_test.background= game.add.sprite(0,0,'background');
level_test.layer.add(level_test.background);
level_test.enviroment.add(level_test.background);

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

level_test.table.body.immovable=true;
level_test.table.body.allowGravity=false;

var enemies = [];

enemies[0] = new pervert(300,0,0.5,300);
enemies[1] = new pervert(400,0,0.5,300);
enemies[2] = new pervert(500,0,0.5,300);

level_test.updateEnemys= function(){

for(i=0;i<enemies.length;i++)
    {
    enemies[i].update();
    }
};
