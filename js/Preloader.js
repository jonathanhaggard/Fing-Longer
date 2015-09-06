var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(80,150, 'loading...', {font: '30px courier', fill: '#ffffff'});
		
		game.load.image('fing', './img/fing.svg');
		game.load.image('ring', './img/ring.png');
		game.load.image('barrier', './img/barrier.png');
		game.load.image('rain', './img/rain.png');
	},
	
	create: function() {
		game.state.start('menu');
	}
};