/**
 * 
 */

//preload
function preload() {
   game.load.spritesheet('mummy', 'resources/jiwon_attackline/img/metalslug_mummy37x45.png', 37, 45, 18);
}


//Monster Entity
function Monster(game, attackLine, speed, lineXIndex, startYOnAttackLine){
	
	this.game = game;
	this.attackLine = attackLine;
	this.speed = speed;
	this.health = 1;
	this.lineXIndex = lineXIndex;
	this.monsterSprite = game.add.sprite(1075, startYOnAttackLine, 'mummy', 5);
	this.monsterSprite.scale.set(2);
    this.monsterSprite.smoothed = false;
    this.anim = this.monsterSprite.animations.add('walk');
    this.monsterSprite.animations.play('walk', 20, true);

    //physics
	game.physics.enable(this.monsterSprite, Phaser.Physics.ARCADE);
}

//Monster Entity prototype damage
Monster.prototype.damage = function(){
	
	
	this.health -= 1;	
	
	
	if (this.health <= 0) {
		this.monsterSprite.kill();
	}
}


//attackLine Info
var lineXLocation = [978, 886, 794, 702, 610, 518, 426, 334, 242, 150];
var lineYLocation = [100, 292, 484];


//monster
var monster1;
var monster2;
var monster3;


//Beat counter
var currentBeat = 0;


function create() {
	
	
	//createMonster
	monster1 = new Monster(game, 0, 1, 0, 100);
	monster2 = new Monster(game, 1, 1, 0, 292);
	monster3 = new Monster(game, 2, 2, 0, 484);
	
	//background
	game.stage.backgroundColor = '#1873CE';
	
	
	//physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//loop depend by beat
	game.time.events.loop(Phaser.Timer.SECOND, start, this);
	
}


//start
function start(){
	
	//start monster2
	commandJump(monster2);
	
	//start monster1 beat 2
	if (currentBeat >= 2) {
		commandJump(monster1);
	}
	
	//start monster3 beat 3
	if (currentBeat >= 5) {
		commandJump(monster3);
	}
	
	if (currentBeat == 7) {
		hitMonster(monster1);
	}

	//add 1 currentBeat
	currentBeat += 1;
}




//commandJump monster unit
//this method have method arriveDestination. arriveDestination is check unit current x location and kill unit 
function commandJump(unit){
	
	//check unit current x location and kill when last jump
	arriveDestination(unit);
	

	//if monster unit speed = 2 jump to lineXindex = 1
	if (unit.speed == 2 && unit.lineXIndex == 0) {
		unit.lineXIndex = 1;
	}

	//attackLine -> absolute value //lineXIndex -> absolute value
	singleJump(unit, lineYLocation[unit.attackLine], lineXLocation[unit.lineXIndex]);
}



//singleJump
function singleJump (unit, maximumHightOnAttackLine, destinationOnlineXLocation) {
	
	//move Y
	game.add.tween(unit.monsterSprite).to({ y: maximumHightOnAttackLine - 100 }, 300, "Sine.easeInOut", true, 0, 0, true);
	//move X
	game.add.tween(unit.monsterSprite).to({ x: destinationOnlineXLocation }, 600, 'Linear', true, 0);
	
	//update Monster unit X value
	if (unit.speed == 1) {
		unit.lineXIndex += 1;
	} else if (unit.speed == 2) {
		unit.lineXIndex += 2;
	}
}


//monster unit damage
function hitMonster(unit, damage){
	
	
	unit.damage();
}

//monster arrive destination //kill monster and reduce damage beathoven
function arriveDestination(unit){
	
	if (unit.speed == 1) {
		if (unit.lineXIndex > 10) {
			unit.monsterSprite.kill();
		}
	} else if (unit.speed == 2) {
		if (unit.lineXIndex > 12) {
			unit.monsterSprite.kill();
		}					
	}
}