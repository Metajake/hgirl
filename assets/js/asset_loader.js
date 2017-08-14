 
 const asset_loader = new Object();  
 
 asset_loader.loadAssets = function() {   
  
   //load json

    game.load.json('girlJson', 'assets/json/girl.json');
    game.load.json('girlSitJson', 'assets/json/girl_sit.json'); 
   
   //load spritesheet
    game.load.spritesheet('girl', 'assets/media/girl.png', 64, 64);
    game.load.spritesheet('girlSit', 'assets/media/girl_sit.png', 64, 64);
 
   //load script
   
    game.load.script('frame_converter', 'assets/js/frame_converter.js');
    game.load.script('controls', 'assets/js/controls.js');
    game.load.script('girl_animator', 'assets/js/girl_animator.js');
    game.load.script('girl', 'assets/js/girl.js');
   

    
    
     
}; 






   

