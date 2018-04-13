/**
 * 
 */

//Monster Entity
function Monster(game, attackLine, speed, monsterName, appearanceBeat){
	
	this.game = game;
	this.attackLine = attackLine;
	this.speed = speed;
	this.health = 1;
	this.maxHealth = 3;
	this.status = "STAY"; //STAY , MOVE , STUN, DIE
	this.lineX = 2000;
	this.monsterHeight = 50;
	this.appearanceBeat = appearanceBeat;
	
	this.monsterSprite = game.add.sprite(1650, lineYLocation[attackLine], monsterName, 5);
	this.monsterSprite = game.add.sprite(1650, lineYLocation[attackLine], monsterName, 5);
	this.monsterSprite.scale.set(2);
	this.monsterSprite.anchor.setTo(0.5,1);
    this.monsterSprite.smoothed = false;
    this.anim = this.monsterSprite.animations.add('walk');
    this.monsterSprite.animations.play('walk', 20, true);
    
    this.monsterHealthbar = game.add.group();
    for (var i = 0; i < this.maxHealth; i++) {
    	
		this.monsterHealthbar.create(3 * i, 0, 'healthFill').anchor.setTo(0.5,1);;
		this.monsterHealthbar.scale.set(2);
		this.monsterHealthbar.smoothed = false;
    }
    this.monsterHealthbar.x = 2000;
    this.monsterHealthbar.y = lineYLocation[attackLine] - this.monsterHeight - 25;

    //physics
	game.physics.enable(this.monsterSprite, Phaser.Physics.ARCADE);
}

//Monster Entity prototype damage
Monster.prototype.damage = function(damage){
	this.health -= damage;	
	
	//체력이 0보다 크다면 체력바 한칸을 없앤다.
	if (this.health >= 0) {
		this.monsterHealthbar.children[this.health].kill();
	}
	
	//체력이 0이되면 몬스터를 없앤다.
	if (this.health <= 0) {
		this.monsterSprite.kill();
	}
}

//start
function start(){
	
	commandJump(monstersA,currentBeat);
	commandJump(monstersB,currentBeat);
	commandJump(monstersC,currentBeat);
}

//commandJump monster unit
//this method have method arriveDestination. arriveDestination is check unit current x location and kill unit 
function commandJump(unitArray,currentBeat){
	
	for(var i = 0; i < unitArray.length; i++ ){
		var unit = unitArray[i];
		if(unit.status != "DIE" && unit.status != "STUN"){
			if(unit.appearanceBeat <= currentBeat){
				var destination;
				
				//check unit current x location and kill when last jump
				arriveDestination(unit);
				if (unit == null) {
					console.log("be Null");
				}
				
				//if monster unit speed = 2 jump to lineXindex = 1
				if (unit.speed == 2 && unit.lineXIndex == 0) {
					unit.lineXIndex = 1;
				}
				if (unit.lineX == 2000) {
					switch(unit.speed){
					case 1: 
					case 3:	destination = 1695 - jumpX[unit.attackLine];	
						break;
					case 2: destination = 1695 - jumpX[unit.attackLine] * unit.speed; 
						break;
						defualt:break;
					}
				}else{
					destination = unit.lineX - jumpX[unit.attackLine]*unit.speed;
				}
				//attackLine -> absolute value //lineXIndex -> absolute value
				switch(unit.attackLine){
				case 0:singleJump(unit, lineYLocation[unit.attackLine], destination); break;
				case 1:singleJump(unit, lineYLocation[unit.attackLine], destination); break;
				case 2:singleJump(unit, lineYLocation[unit.attackLine], destination); break;
				}
			}
		}
	}
}

//singleJump
function singleJump (unit, maximumHeightOnAttackLine, destination) {
	
	//move Y
	game.add.tween(unit.monsterSprite).to({ y: maximumHeightOnAttackLine - 100 }, 300, "Sine.easeInOut", true, 0, 0, true);
	game.add.tween(unit.monsterHealthbar).to({ y: maximumHeightOnAttackLine - 100 - unit.monsterHeight - 25 }, 300, "Sine.easeInOut", true, 0, 0, true);
	//move X
	game.add.tween(unit.monsterSprite).to({ x: destination }, 600, 'Linear', true, 0);
	game.add.tween(unit.monsterHealthbar).to({ x: destination }, 600, 'Linear', true, 0);
	
	unit.lineX = destination;
}


//monster unit damage
function hitMonster(unit, damage){
	unit.damage(damage);
}

//monster arrive destination //kill monster and reduce damage beatoven
function arriveDestination(unit){
	if (unit.lineX < 350) {
		unit.monsterSprite.destroy();
		unit.monsterHealthbar.destroy();
		unit.status = "DIE";
		console.log("Arrived");
		updateLife(-1);
	}
}


//가장 단순하게 데미지를 주는 메소드
function attackLine(unitArray,damage){
	for(var i = 0; i < unitArray.length; i++){
		var unit = unitArray[i];
		if(unit.lineXIndex != 0){
			hitMonster(unit,damage);
		}
	}
}

