/**
 * 
 */

//Monster Entity
function Monster(game, attackLine, speed, monsterName, appearanceBeat){
	
	this.game = game;
	this.attackLine = attackLine;
	this.speed = speed;
	this.health = 1;
	this.status = "STAY"; //STAY , MOVE , STUN
	this.lineXIndex = 0;
	this.appearanceBeat = appearanceBeat;
	this.monsterSprite = game.add.sprite(1650, lineYLocation[attackLine], monsterName, 5);
	this.monsterSprite.scale.set(2);
    this.monsterSprite.smoothed = false;
    this.anim = this.monsterSprite.animations.add('walk');
    this.monsterSprite.animations.play('walk', 20, true);

    //physics
	game.physics.enable(this.monsterSprite, Phaser.Physics.ARCADE);
}

//Monster Entity prototype damage
Monster.prototype.damage = function(damage){
	
	
	this.health -= damage;	
	
	
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
		if(unit != null){
			if(unit.appearanceBeat <= currentBeat){
				//check unit current x location and kill when last jump
				arriveDestination(unit);
				
				//if monster unit speed = 2 jump to lineXindex = 1
				if (unit.speed == 2 && unit.lineXIndex == 0) {
					unit.lineXIndex = 1;
				}
				
				//attackLine -> absolute value //lineXIndex -> absolute value
				singleJump(unit, lineYLocation[unit.attackLine], lineXLocation[unit.lineXIndex]);
			}
		}
	}
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
	unit.damage(damage);
}

//monster arrive destination //kill monster and reduce damage beatoven
function arriveDestination(unit){
	
	if (unit.speed == 1) {
		if (unit.lineXIndex == 10) {
			unit.monsterSprite.destroy();
			unit=null;
			life--;
			updateLife();
		}
	} else if (unit.speed == 2) {
		if (unit.lineXIndex == 11) {
			unit.monsterSprite.destroy();
			unit=null;
			life--;
			updateLife();
		}
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

