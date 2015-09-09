var bootState;
var loadState;
var menuState;
var playState;


//	100% of the browser window - see Boot.js for additional configuration
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

//	Add the States your game has.
//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
//game.state.add('win', winState);

//	Now start the Boot state.
game.state.start('boot');