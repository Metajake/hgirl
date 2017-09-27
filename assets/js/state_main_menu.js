const MainMenu = {
  preload: function(){
    cl("Main Menu Preload")
  },
  create: function(){
    startControl = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function(){
    if(startControl.isDown){
      game.state.start("stateLevel");
    }

  },
  render: function(){

  }
}

game.state.add("stateMainMenu", MainMenu);
