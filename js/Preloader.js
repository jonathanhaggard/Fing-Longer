var loadState = {
	preload: function() {

		
		game.load.image('fing', './img/fing.svg');
		game.load.image('ring', './img/ring.svg');
		game.load.image('barrier', './img/barrier.png');
		game.load.image('rain', './img/rain.svg');
		game.load.image('sine', './img/sine.svg');
		game.load.image('fingFan', './img/fingFan.svg');
		game.load.image('landscape', './img/landscape.svg');
	},
	
	create: function() {
		
		fingFan = game.add.sprite(game.world.centerX, game.world.centerY, 'fingFan');
		fingFan.anchor.setTo(0.5, 0.5);
		var tween = game.add.tween(fingFan).to( { angle: 360 }, 9000, Phaser.Easing.Linear.None, true);
		 tween.repeat(300, 0); 
		 
		 var loadingLabel = game.add.text(game.world.centerX, halfwindowheight /2, 'LOADING', {font: '5vw Catamaran', fill: '#ffffff'});
		 loadingLabel.align = 'center';
		 loadingLabel.anchor.set(0.5);
		 
		 game.state.start('play');
		 
	}
};