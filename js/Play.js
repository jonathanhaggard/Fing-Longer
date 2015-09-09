
var halfwindowheight = (window.innerHeight)/2;
var worldScale = 1;
var bgGroup;
var player;
var playerLeft;
var playerRight;
var ring;
var ringEmitter;
var score = 0;
var scoreText;
var ringParticle;
var shakeWorld = 0;
var timer;
var nameLabel;

var playState = {
    	
   

create: function() {


	//locks the mouse
	game.canvas.addEventListener('mousedown', requestLock);
	function requestLock() {
//		game.world.remove(nameLabel);
		game.add.tween(nameLabel.scale).to({x: 0, y: 0}, 800, Phaser.Easing.Back.In, true);
	    game.input.mouse.requestPointerLock();
	}
	

	game.time.advancedTiming = true;
	    game.time.desiredFps = 60;
	    game.time.slowMotion = 1.0;
	    
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		wkey.onDown.addOnce(this.start, this);
	
	game.world.setBounds(0, 0, window.innerWidth*1.5, window.innerHeight);
	game.stage.backgroundColor = '#30BCED' 
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	var nameLabel = game.add.text(game.world.centerX/1.5, halfwindowheight *0.4, 'Click.', {font: '25vw Catamaran', fill: '#ffffff'});
	nameLabel.align = 'center';
	nameLabel.anchor.set(0.5);
	nameLabel.fixedToCamera = true;
	
	//add score and ignore gravity
	scoreText = game.add.text(game.world.centerX/1.5, halfwindowheight /2, '', { fontSize: '40vw', fill: '#C2F970' });
	game.physics.enable(scoreText, Phaser.Physics.ARCADE);
	scoreText.body.enable = true;
	scoreText.body.exists = true;
	scoreText.body.allowGravity = false;
	scoreText.font = 'Catamaran';
	scoreText.align = 'center';
	scoreText.anchor.set(0.5);
	scoreText.fixedToCamera = true;
	
	landscape = game.add.sprite(0, window.innerHeight/2, 'landscape');
	game.physics.enable(landscape, Phaser.Physics.ARCADE);
	landscape.width = window.innerWidth*1.5;
	landscape.height = window.innerHeight*0.5;
	landscape.body.allowGravity = false;
		
	var sine = game.add.emitter(game.world.centerX, game.world.centerY, 5000);
	sine.width = 1;
	sine.height = game.world.height;
	// sine.angle = 30; // uncomment to set an angle for the sine.

	sine.makeParticles('sine');

	sine.minParticleScale = .5;
	sine.maxParticleScale = 1;
//	sine.body.velocity.y = 90000;	
	
	sine.gravity = 0;
	sine.setYSpeed(0, 0);
	sine.setXSpeed(-50, 50);
	sine.setAlpha(0.1, 1, 2000);
	sine.minRotation = 0;
	sine.maxRotation = 0;

	sine.start(false, 800000, 2000, 0);
		
	

	
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
	
	
	var sineright = game.add.emitter(window.innerWidth*1.5, game.world.centerY, 5000);
	
	sineright.width = 1;
	sineright.height = game.world.height;
	// sineright.angle = 30; // uncomment to set an angle for the sineright.

	sineright.makeParticles('sine');
	sineright.minParticleScale = 0.1;
	sineright.maxParticleScale = 0.6;
//	sineright.body.velocity.y = 90000;	
	
	sineright.gravity = 0;
	sineright.setYSpeed(0, 0);
	sineright.setXSpeed(-100, -200);
	sineright.setAlpha(0.1, 1, 2000);
	sineright.minRotation = 0;
	sineright.maxRotation = 0;
	
	sineright.start(false, 80000, 1500, 0);
	
	
	var sineleft = game.add.emitter(0, game.world.centerY, 5000);
	
	sineleft.width = 1;
	sineleft.height = game.world.height;
	// sineleft.angle = 30; // uncomment to set an angle for the sineleft.

	sineleft.makeParticles('sine');
	sineleft.minParticleScale = 0.1;
	sineleft.maxParticleScale = 0.6;
//	sineleft.body.velocity.y = 90000;	
	
	sineleft.gravity = 0;
	sineleft.setYSpeed(0, 0);
	sineleft.setXSpeed(100, 200);
	sineleft.setAlpha(0.1, 1, 2000);
	sineleft.minRotation = 0;
	sineleft.maxRotation = 0;
	
	sineleft.start(false, 80000, 1500, 0);
	
	//add emittter group
	ringEmitter = game.add.group();
	//group creates multiple ring sprites
	ringEmitter.createMultiple(250, 'ring', 0, false);
    
    //global gravity and enable gameworld
//    game.physics.arcade.gravity.y = 300;
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
    	
        var ringParticle = ringEmitter.getFirstExists(false);
    
        if (ringParticle)
        {
            ringParticle.frame = game.rnd.integerInRange(0,6);
            ringParticle.exists = true;
            ringParticle.anchor.setTo(.85, 0);
            ringParticle.reset(game.world.randomX, -100);
            ringParticle.body.gravity.y = 300;
            ringParticle.game.physics.enable(this, Phaser.Physics.ARCADE);
    //		ringParticle.body.setSize(20, 10, 0, 0);
            ringParticle.body.bounce.y = -.8;
        }
    
    }
        
    
        if (game.input.mouse.locked)
            {
        	nameLabel.destroy();
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
		score += 2;
		scoreText.text =  score;
		
		scalescore = (score) / 1000;
		
		if (scalescore < 0) {
		  scalescore = -scalescore;
		}
		
		if (scalescore > 1.2){
			scalescore = 1.2;
		}

		
		game.add.tween(scoreText.scale).to({x: scalescore+.1, y: scalescore+.1}, 200, Phaser.Easing.Back.In, true);
		
		//add physics and overlap to each ring particle
		ringParticle.body.enable = true;
		ringParticle.x += game.input.mouse.event.movementX;
		ringParticle.body.velocity.x = 0;	
		ringParticle.body.velocity.y = 2000;
		ringParticle.body.bounce.y = 300000;
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
		ringParticle.body.bounce.x = 0.5;
		ringParticle.body.velocity.x = -2000;
		playerLeft.body.immovable = true;
		console.log("bounce");
		shakeWorld = 10;
		game.stage.backgroundColor = '#FF5964' 
		score -= 10;
		scoreText.fill = '#fff';
		timer = game.time.create(false);
	    //  Set a TimerEvent to occur after 3 seconds
	    timer.add(100, normalBGcolor, this);
	
	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();
	    
	    scalescore = (score) / 1000;
		if (scalescore < 0) {
		  scalescore = -scalescore;
		}

		
		game.add.tween(scoreText.scale).to({x: scalescore, y: scalescore}, 200, Phaser.Easing.Back.In, true);
	}
	
	function bounceRight(playerRight, ringParticle) {
		ringParticle.body.enable = true;
		ringParticle.body.bounce.x = 0.5;
		ringParticle.body.velocity.x = 2000;
		playerRight.body.immovable = true;
		console.log("bounce");
		shakeWorld = 10;
		score -= 10;
		scoreText.fill = '#FF5964';
		game.stage.backgroundColor = '#FF5964' 
			
		timer = game.time.create(false);
	    //  Set a TimerEvent to occur after 3 seconds
	    timer.add(100, normalBGcolor, this);
	
	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();
	    
	    scalescore = (score) / 1000;
		if (scalescore < 0) {
		  scalescore = -scalescore;
		}

		
		game.add.tween(scoreText.scale).to({x: scalescore, y: scalescore}, 200, Phaser.Easing.Back.In, true);
	}
	
	function normalBGcolor(){
		game.stage.backgroundColor = '#30BCED';
		scoreText.fill = '#C2F970';
	}
	
	//physics colliders
    game.physics.arcade.collide(player, ringEmitter, null, align, this);
    
	game.physics.arcade.collide(playerLeft, ringEmitter, null, bounceLeft, this);
	
	game.physics.arcade.collide(playerRight, ringEmitter, null, bounceRight, this);
	
    ringEmitter.forEachAlive(checkBounds, this);
    

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
    
    
    if (score < 0){
    	scoreText.fill = '#FF5964';
    }
    

         

},

render: function() {

//    game.debug.cameraInfo(game.camera, 32, 32);
//    game.debug.body(playerLeft);
//    game.debug.body(playerRight);
//    game.debug.body(player);
//    game.debug.body(ringParticle);

},

start: function(){
	game.state.start('play');
	
//	game.input.mouse.releasePointerLock();
},


};