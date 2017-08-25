
 const asset_loader = new Object();

 asset_loader.loadAssets = function() {

   //load json
    game.load.json('girlJson', 'assets/json/girl.json');
    game.load.json('girlSitJson', 'assets/json/girl_sit.json');

   //load spritesheet
    game.load.spritesheet('girl', 'assets/media/girl.png', 64, 64);
    game.load.spritesheet('girlSit', 'assets/media/girl_sit.png', 64, 64);

   //load png
    game.load.image('background', 'assets/media/background.png', 1200, 700);
    game.load.image('floor', 'assets/media/floor.png', 1200, 100);
    game.load.image('pervert', 'assets/media/pervert.png', 1200, 100);
    game.load.image('table', 'assets/media/booth_table_curtain.png', 96, 30);

   //load script
    game.load.script('controls', 'assets/js/controls.js');
    game.load.script('frame_converter', 'assets/js/frame_converter.js');
    game.load.script('girl_animator', 'assets/js/girl_animator.js');
    game.load.script('pervert', 'assets/js/pervert.js');
    game.load.script('level_test', 'assets/js/level_test.js');
    game.load.script('girl', 'assets/js/girl.js');

};
