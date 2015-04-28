
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('fing', './img/fing.png');
	game.load.image('item', './img/test.png');
	game.load.image('item2', './img/test.png');
}

var player;
var item;
var item2;

function create() {
	game.stage.backgroundColor = '#fdb39c' 
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	
	
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'fing');
    game.physics.enable(player, Phaser.Physics.ARCADE);
	player.anchor.setTo(0.5, 0);
	player.body.enable = true;
	player.body.exists = true;

	
	item = game.add.sprite(200, 200, 'item');
	game.physics.enable(item, Phaser.Physics.ARCADE);
	item.body.immovable = true;
	item.body.enable = true;
	item.body.collideWorldBounds = true;
	
    emitter = game.add.emitter(0, 0, window.innerWidth);

    emitter.makeParticles('item', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 200, true, true);

    emitter.minParticleSpeed.setTo(-200, -300);
    emitter.maxParticleSpeed.setTo(200, -400);
    emitter.gravity = 150;
    emitter.bounce.setTo(0.5, 0.5);
	emitter.minRotation = 0;
	emitter.maxRotation = 0;
	
    emitter.start(false, 8000, 1000);
    
    	
    game.canvas.addEventListener('mousedown', requestLock);
    game.input.addMoveCallback(move, this);
}

function requestLock() {
    game.input.mouse.requestPointerLock();
}



function update() {
	game.physics.arcade.overlap(player, item, centerItem, null, this);
	game.physics.arcade.collide(emitter, emitter, collisionHandler, null, this);
	game.physics.arcade.overlap(player, emitter, centerItem, null, this);
}

function collisionHandler (obj1, obj2) {

    game.stage.backgroundColor = '#992d2d';

}

function move(pointer, x, y) {

    if (game.input.mouse.locked)
    {
        player.x += game.input.mouse.event.webkitMovementX;
        player.y += game.input.mouse.event.webkitMovementY;
    }
    

}
function centerItem (obj1, obj2){
	    item.x += game.input.mouse.event.webkitMovementX;
	    item.body.velocity.y = 1000;
	    item.body.enable = true;
}