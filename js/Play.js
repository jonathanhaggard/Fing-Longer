
var halfwindowheight = (window.innerHeight)/2;
var worldScale = 1;
var bgGroup;
var player;
var playerLeft;
var playerRight;
var ring;
var emitter;
var score = 0;
var scoreText;
var ringParticle;
var shakeWorld = 0;
var timer;

var playState = {
    	
   

create: function() {
	//locks the mouse
	game.canvas.addEventListener('mousedown', requestLock);
	function requestLock() {
	    game.input.mouse.requestPointerLock();
	}
	
	//add score and ignore gravity
	scoreText = game.add.text(game.world.centerX, halfwindowheight /2, 'BEGIN', { fontSize: '10vw', fill: '#C2F970' });
	game.physics.enable(scoreText, Phaser.Physics.ARCADE);
	scoreText.body.enable = true;
	scoreText.body.exists = true;
	scoreText.body.allowGravity = false;
	scoreText.font = 'Catamaran';
	scoreText.align = 'center';
	scoreText.anchor.set(0.5);
	
	game.world.setBounds(0, 0, window.innerWidth*1.5, window.innerHeight);
	game.stage.backgroundColor = '#30BCED' 
	game.physics.startSystem(Phaser.Physics.ARCADE);
	

	
	
	var rain = game.add.emitter(game.world.centerX, -400, 60);

	rain.width = game.world.width;
	// rain.angle = 30; // uncomment to set an angle for the rain.

	rain.makeParticles('rain');

	rain.minParticleScale = 0.1;
	rain.maxParticleScale = 1;
	
	rain.gravity.y = 9000;
	rain.setXSpeed(-5, 5);

	rain.minRotation = 0;
	rain.maxRotation = 0;

	rain.start(false, 8000, 500, 0);
	
	//add finger and set the anchor
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'fing');
    game.physics.enable(player, Phaser.Physics.ARCADE);
	player.anchor.setTo(1, 0);
	player.body.collideWorldBounds=true;
	player.body.setSize(60, halfwindowheight);
	player.body.enable = true;
	player.body.exists = true;
	player.body.allowGravity = false;
	player.body.checkCollision.up = false;
	player.body.checkCollision.left = false;
	player.body.checkCollision.right = false;
	player.body.checkCollision.bottom = false;
	
	playerLeft = game.add.sprite(game.world.centerX, game.world.centerY, 'barrier');
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
	
	playerRight = game.add.sprite(game.world.centerX, game.world.centerY, 'barrier');
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
	
	//camera
	game.camera.setPosition(game.width * -0.5, 0);
	game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
	scoreText.fixedToCamera = true;
	
	//add emittter group
	emitter = game.add.group();
	//group creates multiple ring sprites
	emitter.createMultiple(250, 'ring', 0, false);
    
    //global gravity and enable gameworld
    game.physics.arcade.gravity.y = 300;
    game.physics.arcade.enable(game.world, true);
    
    //every 800ms execute the fire function to generate rings
    game.time.events.loop(800, fire, this);
    	

	game.input.addMoveCallback(move, this);
	//grabs the mouse and aligns the finger to it
	function move(pointer, x, y) {
	
	    if (game.input.mouse.locked)
	    {
	        player.x += game.input.mouse.event.movementX;
//	        player.y += game.input.mouse.event.movementY;
	        playerLeft.x = player.x - 80;
	        playerLeft.y = player.y + 20;
	        
	        playerRight.x = player.x + 20;
	        playerRight.y = player.y + 20;
	    }
	    
	
	}

    
    function fire() {
    	
        var ringParticle = emitter.getFirstExists(false);
    
        if (ringParticle)
        {
            ringParticle.frame = game.rnd.integerInRange(0,6);
            ringParticle.exists = true;
            ringParticle.anchor.setTo(.85, 0);
            ringParticle.reset(game.world.randomX, -100);
            ringParticle.game.physics.enable(this, Phaser.Physics.ARCADE);
    //		ringParticle.body.setSize(20, 10, 0, 0);
            ringParticle.body.bounce.y = -.8;
        }
    
    }
},






update: function() {
	
	
	// zoom
//	 if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
//	     worldScale += 0.005;
//	 }
//	 else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
//	     worldScale -= 0.005;
//	 }
//	 
//	 // set a minimum and maximum scale value
//	 worldScale = Phaser.Math.clamp(worldScale, 0.25, 2);
//	 
//	 // set our world scale as needed
//	 game.world.scale.set(worldScale);

	
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
		ringParticle.body.bounce.y = -0.3;
		game.physics.arcade.gravity.y = -2000;
		game.stage.backgroundColor = '#C2F970';
		scoreText.fill = '#fff';
		
		timer = game.time.create(false);
		timer.add(100, normalBGcolor, this);
		timer.start();
		
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
		game.stage.backgroundColor = '#FF5964' 
		score -= 10;
		timer = game.time.create(false);
	    //  Set a TimerEvent to occur after 3 seconds
	    timer.add(100, normalBGcolor, this);
	
	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();
	}
	
	function bounceRight(playerRight, ringParticle) {
		ringParticle.body.enable = true;
		ringParticle.body.bounce.x = 8;
		ringParticle.body.velocity.x = 2000;
		playerRight.body.immovable = true;
		console.log("bounce");
		shakeWorld = 10;
		score -= 10;
		game.stage.backgroundColor = '#FF5964' 
			
		timer = game.time.create(false);
	    //  Set a TimerEvent to occur after 3 seconds
	    timer.add(100, normalBGcolor, this);
	
	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();
	}
	
	function normalBGcolor(){
		game.stage.backgroundColor = '#30BCED';
		scoreText.fill = '#C2F970';
		game.physics.arcade.gravity.y = 300;
	}
	
	//physics colliders
    game.physics.arcade.collide(player, emitter, null, align, this);
    
	game.physics.arcade.collide(playerLeft, emitter, null, bounceLeft, this);
	
	game.physics.arcade.collide(playerRight, emitter, null, bounceRight, this);
	
    emitter.forEachAlive(checkBounds, this);
    

    //kills rings after they go passed the viewport height
    function checkBounds(ringParticle) {
    
        if (ringParticle.y > window.innerHeight)
        {
            ringParticle.kill();
            score -= 10;
            scoreText.text =  score;
//            shakeWorld = 5;
//            game.stage.backgroundColor = '#3BC8ED';
//            timer = game.time.create(false);
//            timer.add(100, normalBGcolor, this);
//            timer.start();
            
        }
        
    }
    
    //shake world code
    if (shakeWorld > 0) {
       var rand1 = game.rnd.integerInRange(-30,30);
       var rand2 = game.rnd.integerInRange(-10,10);
        game.world.setBounds(rand1, rand2, window.innerWidth*1.5 + rand1, window.innerHeight + rand2);
        shakeWorld--;
        if (shakeWorld == 0) {
            game.world.setBounds(0, 0, window.innerWidth*1.5, window.innerHeight); // normalize after shake?
        }
    }

},

render: function() {

    game.debug.cameraInfo(game.camera, 32, 32);
//    game.debug.body(playerLeft);
//    game.debug.body(playerRight);
//    game.debug.body(player);
//    game.debug.body(ringParticle);

}


};