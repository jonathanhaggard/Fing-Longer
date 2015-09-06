var winState = {
	create: function() {
		var nameLabel = game.add.text(80,80,'my first game', {font: '30px courier', fill: '#ffffff'});
		
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.start, this);
	},
	
	start: function(){
		game.state.start('play');
	},
};