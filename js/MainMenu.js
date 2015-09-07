var menuState = {
	create: function() {
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
		
		player = game.add.sprite(game.world.centerX, game.world.centerY, 'fing');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.anchor.setTo(-0.30, 0);
		player.body.collideWorldBounds=true;
		player.body.setSize(60, halfwindowheight);
		
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