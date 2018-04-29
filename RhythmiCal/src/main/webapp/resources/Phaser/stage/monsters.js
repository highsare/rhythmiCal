/**
 * 
 */

//몬스터 객체
function Monster(game, monsterNum, attackLine, speed, monsterName, appearanceBeat, maxHealth){
	
	this.game = game;
	this.monsterNum = monsterNum;
	this.attackLine = attackLine;
	this.speed = speed;
	this.monsterName = monsterName;
	this.health = maxHealth;
	this.maxHealth = maxHealth;
	this.status = "STAY"; //STAY, MOVE, STUN, DIE, CASTING, IMUNE, RUSH
	this.counter = 0; //스킬이 적용되는 시간을 저장하는 속성 지금은 stun만 사용하고 있다.
	this.lineX = 2000;
	this.appearanceBeat = appearanceBeat;
	this.skillPercentage = 0;
	
	this.monsterSprite = game.add.sprite(1650, lineYLocation[attackLine], monsterName, 1);
	//몬스터 종류에 따라서 크기를 다르게 설정해준다.
	switch (monsterNum) {
	case 5:
		this.monsterSprite.scale.set(0.4);
		break;
	case 9:
		this.monsterSprite.scale.set(3);
		break;
	default:
		this.monsterSprite.scale.set(4);
		break;
	}
	this.anim = this.monsterSprite.animations.add('walk', null, 15, true);
	this.anim.play('walk');
	this.monsterSprite.anchor.setTo(0.5, 1);
    this.monsterSprite.smoothed = false;
    
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

//몬스터 객체의 데미지를 받는 함수
Monster.prototype.damage = function(damage){
	
	//이전의 체력값
	var healthBefore = this.health;
	
	if (this.status != "IMMUNE") {
		this.health -= damage;	
	}
	
	//체력이 0보다 크다면 체력바 한칸을 없앤다.
	if (this.health >= 0) {
		//데미지를 입어 체력이 깎였다.
		if (healthBefore > this.health) {
			//attackedMotion(monsterSprite, monsterName)
			attackedMotion(this.monsterSprite, this.monsterName);
			var healthBlank = game.add.sprite(3 * healthBefore, 0, 'healthBlank');
			healthBlank.smoothed = false;
			healthBlank.anchor.setTo(0.5, 1);
			this.monsterHealthbar.replace(this.monsterHealthbar.children[healthBefore], healthBlank);
		} else if (healthBefore == this.health) {//체력이 그대로라면
			if (this.status == "IMMUNE") {//그런데 상태가 무적이라면 무빙상태로 만든다.
				this.status = "MOVE";
			}
		} else {//체력이 증가했다.
			if (this.monsterHealthbar.children[this.health] != null) {
				var healthFill = game.add.sprite(3 * this.health, 0, 'healthFill');
				healthFill.smoothed = false;
				healthFill.anchor.setTo(0.5, 1);
				this.monsterHealthbar.replace(this.monsterHealthbar.children[this.health], healthFill);
			}
		}
	} else { //체력이 0미만이되면 몬스터와 체력바를 없앤다.
		var healthBlank = game.add.sprite(3 * healthBefore, 0, 'healthBlank');
		healthBlank.smoothed = false;
		healthBlank.anchor.setTo(0.5, 1);
		this.monsterHealthbar.replace(this.monsterHealthbar.children[healthBefore], healthBlank);
		//dieMotion(monsterSprite, monsterName, monsterHealthbar)
		dieMotion(this.monsterSprite, this.monsterName, this.monsterHealthbar);
		if (this.monsterNum == 5 && this.status != "DIE") { //죽은 놈이 폭탄맨이라면 범위를 계산해 데미지를 입힌다.
			//explosion(monsterAttackLine, monsterLocationX, arrayA, arrayB, arrayC)
			this.status = "DIE";
			explosion(this.attackLine, this.lineX, monstersA, monstersB, monstersC);
		} else {
			this.status = "DIE";
		}
	}
}


//몬스터가 데미지를 받을시 모션을 실행하는 함수
function attackedMotion(monsterSprite, monsterName){
	var aniName = monsterName + "Hurt";
	monsterSprite.loadTexture(aniName); //맞는 모션이 들어간 스프라이트
	monsterSprite.animations.add('hurtMotion', null, 5, false); //애니메이션 추가
	monsterSprite.animations.play('hurtMotion'); //애니메이션 실행
	
	setTimeout(function(){//맞는 모션을 실행한 후에 다시 돌려주는 함수
		monsterSprite.loadTexture(monsterName); //다시 돌아갈 스프라이트
		anim = monsterSprite.animations.add('walk', null, 15, true);
		anim.play('walk');
		monsterSprite.animations.play('walk'); //다시 애니메이션 실행
	}, 200); //스프라이트 되돌릴 시간 설정
}

//몬스터가 죽을 때 모션을 실행하는 함수
function dieMotion(monsterSprite, monsterName, monsterHealthbar){
	var aniName = monsterName + "Die";
	monsterSprite.loadTexture(aniName); //맞는 모션이 들어간 스프라이트
	monsterSprite.animations.add('DieMotion', null, 5, false); //애니메이션 추가
	monsterSprite.play('DieMotion'); //애니메이션 실행
	
	setTimeout(function(){//죽는 모션을 실행한 후에 다시 돌려주는 함수
		monsterSprite.kill();
		monsterHealthbar.kill();
	}, 2000); //스프라이트를 없애는 시간 설정
}

//몬스터가 스킬을 사용할 시 모션을 실행하는 함수
function useSkillMotion(monsterSprite, monsterName){
	var aniName = monsterName + "Skill";
	monsterSprite.loadTexture(aniName); //스킬 시전 모션이 들어간 스프라이트
	monsterSprite.animations.add('SkillMotion', null, 10, false); //애니메이션 추가
	monsterSprite.animations.play('SkillMotion'); //애니메이션 실행

	setTimeout(function(){//스킬 시전 모션을 실행한 후에 다시 돌려주는 함수
		monsterSprite.loadTexture(monsterName); //다시 돌아갈 스프라이트
		anim = monsterSprite.animations.add('walk', null, 15, true);
		anim.play('walk');
		monsterSprite.animations.play('walk'); //다시 애니메이션 실행
	}, 1000); //스프라이트 되돌릴 시간 설정
}

//몬스터가 러쉬을 사용할 시 모션을 실행하는 함수
function rushMotion(monsterSprite, monsterName){
	var aniName = monsterName + "Rush";
	monsterSprite.loadTexture(aniName); //러쉬 모션이 들어간 스프라이트
	monsterSprite.animations.add('RushMotion', null, 15, true); //애니메이션 추가
	monsterSprite.play('RushMotion'); //애니메이션 실행
}

//몬스터가 밀려오기 시작한다.
function start(){
	commandJump(monstersA, currentBeat); //A라인 몬스터들
	commandJump(monstersB, currentBeat); //B라인 몬스터들
	commandJump(monstersC, currentBeat); //C라인 몬스터들
}

//몬스터들에게 점프를 명령한다.
function commandJump(unitArray, currentBeat){
	for(var i = 0; i < unitArray.length; i++ ){
		//배열의 몬스터를 하나씩 선택
		var unit = unitArray[i];
		
		if (unit.monsterNum == 5 && currentBeat > 3) {
			hitMonster(unit, 1);
		}//test
		//몬스터의 상태가 DIE나 STUN이 아닌 경우
		if(unit.status != "DIE" && unit.status != "STUN"){
			//몬스터의 출현비트가 현재 비트보다 같거나 작은 경우에만 점프를 명령한다.
			if(unit.appearanceBeat <= currentBeat){
				var destination; //목적지를 담을 변수
				//몬스터가 마지막 점프인지 아닌지를 확인해서 처리한다.
				arriveDestination(unit);
				//1~10을 발생시킴
				var random = game.rnd.integerInRange(1, 10);
				// 확률에 따라 그냥 점프와 스킬시전을 위한 멈춤을 구분 //그냥 점프 부분
				if (unit.skillPercentage <= random) {
					//유닛 상태에 따라 점프와 캐스팅을 구분
					if (unit.status != "CASTING") {
						//몬스터의 위치가 첫 출발 때의 목적지를 설정한다.
						if (unit.lineX == 2000) {
							//몬스터의 상태를 rush가 아니라면 move로 바꾼다.
							if (unit.status != "RUSH") {
								unit.status = "MOVE";
							}
							//속도에 따라 처리
							switch(unit.speed){
							case 1: 
							case 3:	destination = 1695 - jumpX[unit.attackLine];	
							break;
							case 2: destination = 1695 - jumpX[unit.attackLine] * unit.speed; 
							break;
							defualt:break;
							}
						}else{ //첫 점프가 아닐 경우 속도를 곱해서 이동시킨다.
							destination = unit.lineX - jumpX[unit.attackLine] * unit.speed;
						}
						//몬스터 종류가 6황소, 7다이노 이라면
						if (unit.monsterNum == 6 || unit.monsterNum == 7) {
							var travelTime = 600;
							if (unit.monsterNum == 6) {
								if (unit.appearanceBeat == currentBeat || unit.appearanceBeat + 1 == currentBeat) {
									rush(unit, destination, travelTime);
									//rush는 중간에 DIE로 바뀌기 때문에 위의 조건을 뚫는다. 여기서 다시 확인해서 null인 cache를 불러오는 것을 방지
								} else if (unit.status != "RUSH" && unit.status != "DIE") {
									//rushMotion(monsterSprite, monsterName)
									rushMotion(unit.monsterSprite, unit.monsterName);
									destination = unit.lineX - jumpX[unit.attackLine] * 8;
									unit.status = "RUSH";
									travelTime = 2000;
									rush(unit, destination, travelTime);
								}
							} else if (unit.monsterNum == 7 && unit.status != "RUSH") {
								destination = unit.lineX - jumpX[unit.attackLine] * 12 - 31; //-31은 2000에서 바로 출발하기 때문에 보정함
								unit.status = "RUSH";
								travelTime = 2000;
								rush(unit, destination, travelTime);
							}
						} else {//몬스터 종류가 황소나 다이노가 아니라면
							//설정된 높이와 목적지로 몬스터를 점프시킨다.
							singleJump(unit, lineYLocation[unit.attackLine], destination);
						}
					} else { //몬스터의 상태가 "CASTING"이라면
						unit.status = "MOVE";
					}
				} else { //확률에 따라 그냥 점프와 스킬시전을 위한 멈춤을 구분 //스킬 시전을 위한 멈춤
					//useSkillMotion(monsterSprite, monsterName)
					useSkillMotion(unit.monsterSprite, unit.monsterName);
					//8번 몬스터라면 노트바를 가리는 스킬을 사용한다.
					ruinNoteBar();
					unit.status = "CASTING";
				}
			}
		} else { // DIE거나 STUN이다.
			if (unit.status == "STUN") {
				unit.counter++;
				if (unit.counter == 3) {
					unit.status = "MOVE";
					unit.counter = 0;
				}
			}
		}
	}//for문 끝
}//function 끝

//점프하지 않고 달리는 메소드
function rush(unit, destination, travelTime){
	//이동 거리
	game.add.tween(unit.monsterSprite).to({ x: destination }, travelTime, 'Linear', true, 0);
	game.add.tween(unit.monsterHealthbar).to({ x: destination }, travelTime, 'Linear', true, 0);

	//다음 목적지를 설정한다. // 죽음이 정해졌을 경우 이동을 다 보여줘야 함으로 지연해 몬스터의 X값을 업데이트한다.
	if (destination > 350) {
		unit.lineX = destination;
	} else {
		setTimeout(function() {
			unit.lineX = destination;
		}, travelTime);
	}
}

//한 칸 점프하기
function singleJump (unit, maximumHeightOnAttackLine, destination) {
	//점프 높이
	game.add.tween(unit.monsterSprite).to({ y: maximumHeightOnAttackLine - 100 }, 300, "Sine.easeInOut", true, 0, 0, true);
	game.add.tween(unit.monsterHealthbar).to({ y: maximumHeightOnAttackLine - 20 }, 300, "Sine.easeInOut", true, 0, 0, true);
	//이동 거리
	game.add.tween(unit.monsterSprite).to({ x: destination }, 600, 'Linear', true, 0);
	game.add.tween(unit.monsterHealthbar).to({ x: destination }, 600, 'Linear', true, 0);
	//다음 목적지를 설정한다.
	unit.lineX = destination;
}
//몬스터에게 데미지를 먹이는 함수
function hitMonster(unit, damage){
	unit.damage(damage);
}
//몬스터가 끝에 도달했을 때 처리를 하는 함수 //몬스터를 죽이고 비토벤의 체력을 줄인다.
function arriveDestination(unit){
	if (unit.lineX < 350) {
		unit.status = "DIE";
		unit.monsterSprite.destroy();
		unit.monsterHealthbar.destroy();
		console.log("Arrived");
		updateLife(-1);
	}
}
//가장 단순하게 데미지를 주는 메소드
function attackLine(unitArray, damage){
	for(var i = 0; i < unitArray.length; i++){
		var unit = unitArray[i];
		if(unit.status != "DIE"){
			if (unit.monsterNum == 9) {//몬스터 번호가 9인 방패몬스터를 만나면 뒤의 몬스터에게 데미지를 먹이지 않는다.
				hitMonster(unit, damage);
				break;
			}
			hitMonster(unit,damage);
		}
	}
}

