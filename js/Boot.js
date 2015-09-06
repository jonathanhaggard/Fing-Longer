
var bootState = {
	
	create: function() {
		game.stage.backgroundColor = '#30BCED' 
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.state.start('load');
	}
	
	
};