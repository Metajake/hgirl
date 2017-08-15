 
 const level_test = new Object();  


level_test.enviroment= game.add.group();
level_test.layer= game.add.group();
level_test.platforms = game.add.group();
level_test.platforms.enableBody = true;





level_test.background= game.add.sprite(0,0,'background');
level_test.layer.add(level_test.background);
level_test.enviroment.add(level_test.background);

level_test.floor= game.add.sprite(0,600,'floor');
level_test.layer.add(level_test.floor);
level_test.enviroment.add(level_test.floor);
level_test.platforms.add(level_test.floor);
level_test.floor.body.immovable=true;
level_test.floor.body.allowGravity=false;

















   

