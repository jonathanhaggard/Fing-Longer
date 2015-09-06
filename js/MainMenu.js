var menuState = {
	create: function() {
		var nameLabel = game.add.text(game.world.centerX, halfwindowheight /2, 'FINGLONGER', {font: '5vw Catamaran', fill: '#ffffff'});
		nameLabel.align = 'center';
		nameLabel.anchor.set(0.5);
		
		var nameLabel = game.add.text(game.world.centerX, halfwindowheight /2, 'FINGLONGER', {font: '5vw Catamaran', fill: '#ffffff'});
		nameLabel.align = 'center';
		nameLabel.anchor.set(0.5);
		
		var nameLabel = game.add.text(game.world.centerX, halfwindowheight /1, 'Double Click.', {font: '10vw Catamaran', fill: '#ffffff'});
		nameLabel.align = 'center';
		nameLabel.anchor.set(0.5);
		
		
		//on click go to play
		game.input.onDown.add(this.start, this);
		
//		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
//		
//		wkey.onDown.addOnce(this.start, this);
	},
	
	start: function(){
		game.state.start('play');
	},
};