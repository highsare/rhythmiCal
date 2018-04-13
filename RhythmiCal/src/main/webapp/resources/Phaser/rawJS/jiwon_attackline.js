/**
 * 
 */

//preload
function preload() {
   game.load.spritesheet('mummy', 'resources/jiwon_attackline/img/metalslug_mummy37x45.png', 37, 45, 18);
}


//Monster Entity 몬스터객체 생성 함수
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

    //physics 객체 물리 허가
	game.physics.enable(this.monsterSprite, Phaser.Physics.ARCADE);
}

//Monster Entity prototype damage 몬스터 객체 데미지 업데이트 함수
Monster.prototype.damage = function(){
	
	
	this.health -= 1;	
	
	
	if (this.health <= 0) {
		this.monsterSprite.kill();
	}
}


//몬스터가 점프할 곳과 공격라인의 절대값의 배열
var lineXLocation = [978, 886, 794, 702, 610, 518, 426, 334, 242, 150];
var lineYLocation = [100, 292, 484];


//테스트를 위한 몬스터를 담을 변수
var monster1;
var monster2;
var monster3;

//비트에 따른 반복을 담을 변수
var timeloop;

//현재비트를 담을 변수
var currentBeat = 0;


function create() {
	
	
	//몬스터 생성 별도의 메소드를 생성해야 한다.
	monster1 = new Monster(game, 0, 1, 0, 100);
	monster2 = new Monster(game, 1, 1, 0, 292);
	monster3 = new Monster(game, 2, 2, 0, 484);
	
	//임의의 배경색 지정
	game.stage.backgroundColor = '#1873CE';
	
	
	//physics 게임 물리 적용
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//비트에 따른 반복적 함수 호출
	timeloop = game.time.events.loop(Phaser.Timer.SECOND, start, this);
	
}


//몬스터 공격 시작
function monsterAttackStart(){
	

	//현재비트 값에 따라서 몬스터를 출발시킨다. //나중에 몬스터의 OrderOfAttack과 currentBeat가 같을 때 출발하도록 수정한다.
	if (currentBeat >= 0) {
		singleJump(monster2);
	}
	
	if (currentBeat >= 2) {
		singleJump(monster1);
	}
	
	if (currentBeat >= 5) {
		singleJump(monster3);
	}
	
	if (currentBeat == 7) {
		hitMonster(monster1);
	}

	//현재비트 값을 갱신한다.
	currentBeat += 1;
}




//하나의 점프 //라인별로 다른 Y값을 받아 점프를 처리해주고 //유닛의 speed에 따라 다음에 뛸 X값을 업데이트 해준다.
function singleJump (unit) {
	
	//유닛의 현재 x 위치를 확인한다. 마지막 점프를 했다면 죽인다.
	arriveDestination(unit);
	

	//유닛의 speed 값에 따라 초기에 뛰어야 할 위치를 보정한다.
	if (unit.speed == 2 && unit.lineXIndex == 0) {
		unit.lineXIndex = 1;
	}

	//점프 //유닛에 저장된 attackline을 받아 lineYLocation[]을 참조 절대값으로 변환하여 점프한다.
	game.add.tween(unit.monsterSprite).to({ y: lineYLocation[unit.attackLine] - 100 }, 300, "Sine.easeInOut", true, 0, 0, true);
	//점프 거리 //유닛에 저장된 lineXIndex를 받아 lineXLocation[]을 참조 절대값으로 변환하여 이동한다.
	game.add.tween(unit.monsterSprite).to({ x: lineXLocation[unit.lineXIndex] }, 600, 'Linear', true, 0);
	
	//유닛의 다음 점프 위치를 업데이트 한다.
	if (unit.speed == 1) {
		unit.lineXIndex += 1;
	} else if (unit.speed == 2) {
		unit.lineXIndex += 2;
	}
}


//몬스터 데미지를 업데이트하는 함수
function hitMonster(unit, damage){
	//유닛이 데미지를 받는다.
	unit.damage();
}

//몬스터가 목적지에 도달했다. //몬스터를 사라지게 하고 비토벤의 생명력을 깎는다.
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