
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('fing', './img/fing.png');
	game.load.image('test', './img/test.png');
}

var player;
var item;

function create() {
	game.stage.backgroundColor = '#fdb39c' 
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	
	
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'fing');
    game.physics.enable(player, Phaser.Physics.ARCADE);
	player.anchor.setTo(0.5, 0);
	player.body.enable = true;
	player.body.exists = true;
	
	
	item = game.add.sprite(200, 200, 'test');
	game.physics.enable(item, Phaser.Physics.ARCADE);
	item.body.immovable = true;
	item.body.enable = true;
	
	
    game.canvas.addEventListener('mousedown', requestLock);
    game.input.addMoveCallback(move, this);
}

function requestLock() {
    game.input.mouse.requestPointerLock();
}

function move(pointer, x, y) {

    if (game.input.mouse.locked)
    {
        player.x += game.input.mouse.event.webkitMovementX;
        player.y += game.input.mouse.event.webkitMovementY;
    }
    

}

function update() {
	game.physics.arcade.collide(player, item, collisionHandler, null, this);
}

function collisionHandler (obj1, obj2) {

    game.stage.backgroundColor = '#992d2d';

}