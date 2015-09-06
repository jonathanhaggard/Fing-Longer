
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('fing', './img/fing.svg');
	game.load.image('ring', './img/ring.png');
	game.load.image('Bbarrier', './img/Bbarrier.png');
}

var halfwindowheight = (window.innerHeight)/2;
var player;
var playerLeft;
var playerRight;
var ring;
var emitter;
var score = 0;
var scoreText;
var ringParticle;
var shakeWorld = 0;

function create() {
	game.stage.backgroundColor = '#30BCED' 
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//add score and ignore gravity
	scoreText = game.add.text(game.world.centerX, halfwindowheight /2, 'score', { fontSize: '10vw', fill: '#C2F970' });
	game.physics.enable(scoreText, Phaser.Physics.ARCADE);
	scoreText.body.enable = true;
	scoreText.body.exists = true;
	scoreText.body.allowGravity = false;
	scoreText.font = 'Nunito';
	scoreText.align = 'left';
	scoreText.anchor.set(0.5);
	
	//add finger and set the anchor
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'fing');
    game.physics.enable(player, Phaser.Physics.ARCADE);
	player.anchor.setTo(-0.30, 0);
	player.body.collideWorldBounds=true;
	player.body.setSize(60, halfwindowheight);
	player.body.enable = true;
	player.body.exists = true;
	player.body.allowGravity = false;
	player.body.checkCollision.up = false;
	player.body.checkCollision.left = true;
	player.body.checkCollision.right = true;
	
	playerLeft = game.add.sprite(game.world.centerX, game.world.centerY, 'Bbarrier');
	game.physics.enable(playerLeft, Phaser.Physics.ARCADE);
	player.body.collideWorldBounds=true;
	playerLeft.body.collideWorldBounds=false;
	playerLeft.body.setSize(2, halfwindowheight);
	playerLeft.body.enable = true;
	playerLeft.body.exists = true;
	playerLeft.body.allowGravity = false;
	playerLeft.body.checkCollision.up = false;
	playerLeft.body.checkCollision.left = true;
	playerLeft.body.checkCollision.right = false;
	
	playerRight = game.add.sprite(game.world.centerX, game.world.centerY, 'Bbarrier');
	game.physics.enable(playerRight, Phaser.Physics.ARCADE);
	player.body.collideWorldBounds=true;
	playerRight.body.collideWorldBounds=false;
	playerRight.body.setSize(2, halfwindowheight);
	playerRight.body.enable = true;
	playerRight.body.exists = true;
	playerRight.body.allowGravity = false;
	playerRight.body.checkCollision.up = false;
	playerRight.body.checkCollision.left = false;
	playerRight.body.checkCollision.right = true;
	
	
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
function render () {


}
function fire() {
	
    var ringParticle = emitter.getFirstExists(false);

    if (ringParticle)
    {
        ringParticle.frame = game.rnd.integerInRange(0,6);
        ringParticle.exists = true;
        ringParticle.reset(game.world.randomX, -100);
        ringParticle.game.physics.enable(this, Phaser.Physics.ARCADE);
//		ringParticle.body.setSize(20, 10, 0, 0);
        ringParticle.body.bounce.y = -.8;
    }

}

//aligns the ring to the finger when it overlaps
function align(player, ringParticle) {

	//score add
	score += 10;
	scoreText.text =  score;
	
	//add physics and overlap to each ring particle
	ringParticle.body.enable = true;
	ringParticle.x += game.input.mouse.event.movementX;
	ringParticle.body.velocity.x = 0;	
	ringParticle.body.velocity.y = 1000;
	ringParticle.body.bounce.y = -.3;
	
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


function bounceLeft(playerLeft, ringParticle) {
	ringParticle.body.enable = true;
	ringParticle.body.bounce.x = 8;
	ringParticle.body.velocity.x = -2000;
	playerLeft.body.immovable = true;
	console.log("bounce");
	shakeWorld = 10;
}

function bounceRight(playerRight, ringParticle) {
	ringParticle.body.enable = true;
	ringParticle.body.bounce.x = 8;
	ringParticle.body.velocity.x = 2000;
	playerRight.body.immovable = true;
	console.log("bounce");
	shakeWorld = 10;
}

function requestLock() {
    game.input.mouse.requestPointerLock();
}



function update() {
//	game.physics.arcade.overlap(player, ring, centerItem, null, this);
	
	
    game.physics.arcade.collide(player, emitter, null, align, this);
    
	game.physics.arcade.collide(playerLeft, emitter, null, bounceLeft, this);
	
	game.physics.arcade.collide(playerRight, emitter, null, bounceRight, this);
	
    emitter.forEachAlive(checkBounds, this);
    
    //shake world code
    if (shakeWorld > 0) {
       var rand1 = game.rnd.integerInRange(-10,10);
       var rand2 = game.rnd.integerInRange(-10,10);
        game.world.setBounds(rand1, rand2, game.width + rand1, game.height + rand2);
        shakeWorld--;
        if (shakeWorld == 0) {
            game.world.setBounds(0, 0, game.width,game.height); // normalize after shake?
        }
    }
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
//        player.y += game.input.mouse.event.movementY;
        playerLeft.x = player.x - 5;
        playerLeft.y = player.y + 20;
        
        playerRight.x = player.x + 80;
        playerRight.y = player.y + 20;
    }
    

}
