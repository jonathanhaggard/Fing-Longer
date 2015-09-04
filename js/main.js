
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('fing', './img/fing.svg');
	game.load.image('ring', './img/ring.svg');
}

var player;
var ring;
var emitter;
var score = 0;
var scoreText;
var ringParticle;
function create() {
	game.stage.backgroundColor = '#fdb39c' 
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//add score and ignore gravity
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	game.physics.enable(scoreText, Phaser.Physics.ARCADE);
	scoreText.body.enable = true;
	scoreText.body.exists = true;
	scoreText.body.allowGravity = false;
	
	//add finger and set the anchor
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'fing');
    game.physics.enable(player, Phaser.Physics.ARCADE);
	player.anchor.setTo(-0.25, 0);
	player.body.enable = true;
	player.body.exists = true;
	player.body.allowGravity = false;
	player.body.checkCollision.up = false;
	player.body.checkCollision.down = false;
		
	//add emittter group
	emitter = game.add.group();
	//group creates multiple ring sprites
	emitter.createMultiple(250, 'ring', 0, false);
    
    //global gravity and enable gameworld
    game.physics.arcade.gravity.y = 300;
    game.physics.arcade.enable(game.world, true);
    
    //every 800ms execute the fire function to generate rings
    game.time.events.loop(800, fire, this);
    
    
    //mouse lock request	
    game.canvas.addEventListener('mousedown', requestLock);
    game.input.addMoveCallback(move, this);
}

function fire() {
	
    var ringParticle = emitter.getFirstExists(false);

    if (ringParticle)
    {
        ringParticle.frame = game.rnd.integerInRange(0,6);
        ringParticle.exists = true;
        ringParticle.reset(game.world.randomX, 0);

        ringParticle.body.bounce.y = -.8;
        
    }

}

//aligns the ring to the finger when it overlaps
function align(player, ringParticle) {

	//score add
	score += 10;
	scoreText.text = 'Score: ' + score;
	
	//add physics and overlap to each ring particle
	ringParticle.body.enable = true;
	ringParticle.x += game.input.mouse.event.movementX;
	ringParticle.body.velocity.x = 0;	
	
	
    if (ringParticle.x = (player.x))
    {
        return true;
    }
    else
    {
        ringParticle.body.velocity.x = player.body.velocity.x;
        ringParticle.body.velocity.y *= -(ringParticle.body.bounce.y);

        return false;
    }

}


function bounce(player, ringParticle) {
	ringParticle.body.enable = true;
	ringParticle.body.velocity.x = 200;
}

function requestLock() {
    game.input.mouse.requestPointerLock();
}



function update() {
//	game.physics.arcade.overlap(player, ring, centerItem, null, this);
	
	
    game.physics.arcade.overlap(player, emitter, null, align, this);
    
	game.physics.arcade.collide(player, ringParticle, null, bounce, this);
	
    emitter.forEachAlive(checkBounds, this);
}

//kills rings after they go passed the viewport height
function checkBounds(ringParticle) {

    if (ringParticle.y > window.innerHeight)
    {
        ringParticle.kill();
    }

}


//grabs the mouse and aligns the finger to it
function move(pointer, x, y) {

    if (game.input.mouse.locked)
    {
        player.x += game.input.mouse.event.movementX;
        player.y += game.input.mouse.event.movementY;
    }
    

}
