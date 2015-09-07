var fingFan;
var menuState = {
	create: function() {
	
		fingFan = game.add.sprite(game.world.centerX, game.world.centerY/2, 'fingFan');
		fingFan.anchor.setTo(0.5, 0.5);
		var tween = game.add.tween(fingFan).to( { angle: 360 }, 9000, Phaser.Easing.Linear.None, true);
		 tween.repeat(300, 0); 
		 
		var nameLabel = game.add.text(game.world.centerX, halfwindowheight /2, 'FINGLONGER', {font: '5vw Catamaran', fill: '#ffffff'});
		nameLabel.align = 'center';
		nameLabel.anchor.set(0.5);
		
		var nameLabel = game.add.text(game.world.centerX, halfwindowheight /2, 'FINGLONGER', {font: '5vw Catamaran', fill: '#ffffff'});
		nameLabel.align = 'center';
		nameLabel.anchor.set(0.5);
		
		var nameLabel = game.add.text(game.world.centerX, halfwindowheight *1.1, 'Double', {font: '25vw Catamaran', fill: '#ffffff'});
		nameLabel.align = 'center';
		nameLabel.anchor.set(0.5);
		var nameLabel = game.add.text(game.world.centerX, halfwindowheight *1.7, 'Click', {font: '25vw Catamaran', fill: '#ffffff'});
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