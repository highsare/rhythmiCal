/**
 * 
 */

//Monster Entity
function Monster(game, monsterNum, attackLine, speed, monsterName, appearanceBeat, maxHealth){
	
	this.game = game;
	this.monsterNum = monsterNum;
	this.attackLine = attackLine;
	this.speed = speed;
	this.health = maxHealth;
	this.maxHealth = maxHealth;
	this.status = "STAY"; //STAY , MOVE , STUN, DIE, CASTING, IMUNE, RUSH
	this.lineX = 2000;
	this.appearanceBeat = appearanceBeat;
	this.skillPercentage = 0;
	
	this.monsterSprite = game.add.sprite(1650, lineYLocation[attackLine], monsterName, 1);
	this.monsterSprite.scale.set(2);
	this.monsterSprite.anchor.setTo(0.5, 1);
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
	
	if (this.status != "IMUNE") {
		this.health -= damage;	
	}
	
	//체력이 0보다 크다면 체력바 한칸을 없앤다.
	if (this.health >= 0) {
		//데미지를 입어 체력이 깎였다.
		if (healthBefore > this.health) {
			attackedMotion(this.monsterSprite);
			var healthBlank = game.add.sprite(3 * healthBefore, 0, 'healthBlank');
			healthBlank.smoothed = false;
			healthBlank.anchor.setTo(0.5, 1);
			this.monsterHealthbar.replace(this.monsterHealthbar.children[healthBefore], healthBlank);
		} else if (healthBefore == this.health) {
			if (this.status == "IMUNE") {
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
		this.monsterSprite.kill();
		this.monsterHealthbar.kill();
		this.status = "DIE";
	}
}


//몬스터가 데미지를 받을시 모션을 실행하는 함수
function attackedMotion(monsterSprite){
	monsterSprite.loadTexture('beatoven'); //맞는 모션이 들어간 스프라이트
	monsterSprite.animations.add('attackedMotion'); //애니메이션 추가
	monsterSprite.animations.play('attackedMotion', 50, true); //애니메인션 실행
	monsterSprite.scale.set(2); //크기 설정
	monsterSprite.anchor.setTo(0.5,1); //앵커 설정
    monsterSprite.smoothed = false; //안티엘리어싱 제거
	
	setTimeout(function(){//맞는 모션을 실행한 후에 다시 돌려주는 함수
		monsterSprite.loadTexture('mummy'); //다시 돌아갈 스프라이트
		monsterSprite.animations.add('walk'); //다시 애니메이션 추가
		monsterSprite.animations.play('walk', 20, true); //다시 애니메이션 실행
		monsterSprite.scale.set(2); //다시 크기 설정
		monsterSprite.anchor.setTo(0.5,1); //다시 앵커 설정
	    monsterSprite.smoothed = false; //다시 안티엘리어싱 제거
	}, 50); //스프라이트 되돌릴 시간 설정
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
						//몬스터 종류가 1황소, 2런닝맨 이라면
						if (unit.monsterNum == 1 || unit.monsterNum == 2) {
							var travelTime = 600;
							if (unit.monsterNum == 1) {
								if (unit.appearanceBeat == currentBeat) {
									rush(unit, destination, travelTime);
								} else if (unit.appearanceBeat < currentBeat && unit.status != "RUSH") {
									destination = unit.lineX - jumpX[unit.attackLine] * 9;
									unit.status = "RUSH";
									travelTime = 2000;
									rush(unit, destination, travelTime);
								}
							} else if (unit.monsterNum == 2 && unit.status != "RUSH") {
								destination = unit.lineX - jumpX[unit.attackLine] * 12 - 31; //-31은 2000에서 바로 출발하기 때문에 보정함
								unit.status = "RUSH";
								travelTime = 2000;
								rush(unit, destination, travelTime);
							}
						} else {//몬스터 종류가 1, 2가 아니라면
							//설정된 높이와 목적지로 몬스터를 점프시킨다.
							singleJump(unit, lineYLocation[unit.attackLine], destination)
						}
					} else { //몬스터의 상태가 "CASTING"이라면
						unit.status = "MOVE";
					}
				} else { //확률에 따라 그냥 점프와 스킬시전을 위한 멈춤을 구분 //스킬 시전을 위한 멈춤
					unit.status = "CASTING";
				}
			}
		}// DIE가 아니면서 STUN이 아니다 조건문 끝
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

	hitMonster(unit, 1); //테스트를 위해서 임으로 주는 데미지
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
		unit.monsterSprite.destroy();
		unit.monsterHealthbar.destroy();
		unit.status = "DIE";
		console.log("Arrived");
		updateLife(-1);
	}
}
//가장 단순하게 데미지를 주는 메소드
function attackLine(unitArray, damage){
	for(var i = 0; i < unitArray.length; i++){
		var unit = unitArray[i];
		if(unit.lineXIndex != 0){
			hitMonster(unit,damage);
		}
	}
}

