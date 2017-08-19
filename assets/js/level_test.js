const level_test = new Object();


level_test.enviroment= game.add.group();
level_test.platforms = game.add.group();
level_test.platforms.enableBody = true;
level_test.layer= game.add.group();




level_test.background= game.add.sprite(0,0,'background');
level_test.layer.add(level_test.background);
level_test.enviroment.add(level_test.background);

level_test.floor= game.add.tileSprite(-600,600,2400, 50,'floor');
level_test.layer.add(level_test.floor);
level_test.enviroment.add(level_test.floor);
level_test.platforms.add(level_test.floor);
level_test.floor.body.immovable=true;
level_test.floor.body.allowGravity=false;
game.physics.arcade.enable(level_test.floor, Phaser.Physics.ARCADE);


var enemies = [];

enemies[0] = new pervert(300,500,0.5,300);
enemies[1] = new pervert(400,500,0.5,300);
enemies[2] = new pervert(500,500,0.5,300);

level_test.updateEnemys= function(){

for(i=0;i<enemies.length;i++)
    {
    enemies[i].update();
    }
};

