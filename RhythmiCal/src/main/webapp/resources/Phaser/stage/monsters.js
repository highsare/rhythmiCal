/**
 * 
 */

//Monster Entity
function Monster(game, attackLine, speed, monsterName, appearanceBeat, maxHealth){
	
	this.game = game;
	this.attackLine = attackLine;
	this.speed = speed;
	this.health = maxHealth;
	this.maxHealth = maxHealth;
	this.status = "STAY"; //STAY , MOVE , STUN, DIE
	this.lineX = 2000;
	this.appearanceBeat = appearanceBeat;
	
	this.monsterSprite = game.add.sprite(1650, lineYLocation[attackLine], monsterName, 1);
	this.monsterSprite.scale.set(2);
	this.monsterSprite.anchor.setTo(0.5,1);
    this.monsterSprite.smoothed = false;
    this.anim = this.monsterSprite.animations.add('walk');
    this.monsterSprite.animations.play('walk', 20, true);
    
    this.monsterHealthbar = game.add.group();
    for (var i = 0; i < this.maxHealth; i++) {
    	
		this.monsterHealthbar.create(3 * i, 0, 'healthFill');
		this.monsterHealthbar.scale.set(3);
		this.monsterHealthbar.children[i].smoothed = false; //차일드로 접근해서 false로 수정
		this.monsterHealthbar.children[i].anchor.setTo(0.5,1); //그룹에는 앵커가 없음... ㄷㄷㄷ
		this.monsterHealthbar.smoothed = false;
		
    }
    this.monsterHealthbar.x = 1650;
    this.monsterHealthbar.y = lineYLocation[attackLine] +80;
    this.health -= 1; //healthbar index를 위한 처리

    //physics
	game.physics.enable(this.monsterSprite, Phaser.Physics.ARCADE);
}

//Monster Entity prototype damage
Monster.prototype.damage = function(damage){
	
	//이전의 체력값
	var healthBefore = this.health;
	
	this.health -= damage;	
	
	//체력이 0보다 크다면 체력바 한칸을 없앤다.
	if (this.health >= 0) {
		//데미지를 입어 체력이 깎였다.
		if (healthBefore > this.health) {
			var healthBlank = game.add.sprite(3 * healthBefore, 0, 'healthBlank');
			healthBlank.smoothed = false;
			healthBlank.anchor.setTo(0.2, 0);
			this.monsterHealthbar.replace(this.monsterHealthbar.children[healthBefore], healthBlank);
		} else {//체력이 증가했다.
			if (this.monsterHealthbar.children[this.health] != null) {
				var healthFill = game.add.sprite(3 * this.health, 0, 'healthFill');
				healthFill.smoothed = false;
				healthFill.anchor.setTo(0.2, 0);
				this.monsterHealthbar.replace(this.monsterHealthbar.children[this.health], healthFill);
			}
		}
	} else { //체력이 0미만이되면 몬스터와 체력바를 없앤다.
		this.monsterSprite.kill();
		this.monsterHealthbar.kill();
	}
}

//start
function start(){
	commandJump(monstersA, currentBeat);
	commandJump(monstersB, currentBeat);
	commandJump(monstersC, currentBeat);
}

//commandJump monster unit
//this method have method arriveDestination. arriveDestination is check unit current x location and kill unit 
function commandJump(unitArray,currentBeat){
	//alert("In");
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
	game.add.tween(unit.monsterHealthbar).to({ y: maximumHeightOnAttackLine -20 }, 300, "Sine.easeInOut", true, 0, 0, true);
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

