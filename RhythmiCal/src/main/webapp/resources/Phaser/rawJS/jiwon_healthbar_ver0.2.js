
//preload
function preload() {
   game.load.spritesheet('healthFill', 'resources/jiwon_attackline/img/healthFill.png', 32, 32, 1);
   game.load.spritesheet('healthBlank', 'resources/jiwon_attackline/img/healthBlank.png', 32, 32, 1);
}

//몬스터 객체
function Monster(game, attackLine, speed, lineXIndex, health){
	
	this.game = game;
	this.attackLine = attackLine;
	this.speed = speed;
	this.health = health;
	this.lineXIndex = lineXIndex;
	
	this.monsterSprite = game.add.sprite(1075, lineYLocation[attackLine], 'mummy', 5);
	this.monsterSprite.scale.set(2);
    this.monsterSprite.smoothed = false;
    this.anim = this.monsterSprite.animations.add('walk');
    this.monsterSprite.animations.play('walk', 20, true);
    
    this.monsterHealthbar = game.add.group();
    for (var i = 0; i < this.health; i++) {
		this.monsterHealthbar.create(3 * i, 0, 'healthFill');
		this.monsterHealthbar.scale.set(3);
		this.monsterHealthbar.children[i].smoothed = false; //차일드로 접근해서 false로 수정
		this.monsterHealthbar.children[i].anchor.setTo(0.2, 0); //그룹에는 앵커가 없음... ㄷㄷㄷ
		this.monsterHealthbar.inputEnabled = true;
    }
    this.monsterHealthbar.x = 1075;
    this.monsterHealthbar.y = lineYLocation[attackLine] + 80;
    this.health -= 1; //healthbar index를 위한 처리
    //physics
	game.physics.enable(this.monsterSprite, Phaser.Physics.ARCADE);
}

//몬스터 객체의 체력을 업데이트 할 객체에 정의된 함수 //체력은 인덱스 번호로 쓸 수 있도록 객체 안에 처리했다.
Monster.prototype.damage = function(damage){
	
	//이전의 체력값
	var healthBefore = this.health;

	//체력을 깎거나 더한다.
	this.health -= damage;

	//alert('healthBefore:' + healthBefore + '// this.health :' + this.health);
	//체력이 0이상이면 체력바 한칸을 없앤다.
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


//몬스터가 점프할 곳과 공격라인의 절대값의 배열
var lineXLocation = [978, 886, 794, 702, 610, 518, 426, 334, 242, 150];
var lineYLocation = [100, 292, 484];


//테스트를 위한 몬스터를 담을 변수
var monster1;
var monster2;
var monster3;

//스테이지 클리어 또는 실패 시 결과 안내 이미지를 위한 전역변수
var item;
var shadow;
var tween;

//비트에 따른 반복을 담을 변수
var timeloop;


//현재비트를 담을 변수
var currentBeat = 0;

//이펙트 테스트용 키를 담을 변수
var key1;
var key2;
var key3;

function create() {

	
	//몬스터 생성 별도의 메소드를 생성해야 한다. //테스트를 위해 체력을 받도록 변수를 수정했다. //DB에서 받아온 리스트로 생성할 때도 필요하지 않을까 싶다.
	monster1 = new Monster(game, 0, 1, 0, 5);
	monster2 = new Monster(game, 1, 1, 0, 3);
	monster3 = new Monster(game, 2, 2, 0, 2);
	
	//임의의 배경색 지정
	game.stage.backgroundColor = '#1873CE';
	
	//게임물리 아케이드로 적용
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	key1.onDown.add(add1, this);
	key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	key2.onDown.add(add2, this);
	key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	key3.onDown.add(add3, this);
	
	//비트에 따른 반복적 함수 호출
	timeloop = game.time.events.loop(Phaser.Timer.SECOND, monsterAttackStart, this);
}

//몬스터 공격 시작
function monsterAttackStart(){
	

	//현재비트 값에 따라서 몬스터를 출발시킨다. //나중에 몬스터의 OrderOfAttack과 currentBeat가 같을 때 출발하도록 수정한다.
	if (currentBeat >= 0) {
		singleJump(monster1);
	}
	
	if (currentBeat >= 2) {
		singleJump(monster2);
	}
	
	if (currentBeat >= 5) {
		singleJump(monster3);
	}

	if (currentBeat >= 3 && currentBeat <= 5) {
		//테스트 맞는다.
		hitMonster(monster1, 1);
		//hitMonster(monster2);
	}

	if (currentBeat >= 6) {
		//회복한다.
		hitMonster(monster1, -1);
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


	//점프 //유닛에 저장된 attackline을 받아 lineYLocation[]을 참조 절대값으로 변환하여 점프한다. //체력바 스케일을 키우면서 -20으로 조절했다.
	game.add.tween(unit.monsterSprite).to({ y: lineYLocation[unit.attackLine] - 100 }, 300, "Sine.easeInOut", true, 0, 0, true);
	game.add.tween(unit.monsterHealthbar).to({ y: lineYLocation[unit.attackLine] - 20 }, 300, "Sine.easeInOut", true, 0, 0, true);
	//점프 거리 //유닛에 저장된 lineXIndex를 받아 lineXLocation[]을 참조 절대값으로 변환하여 이동한다.
	game.add.tween(unit.monsterSprite).to({ x: lineXLocation[unit.lineXIndex] }, 600, 'Linear', true, 0);
	game.add.tween(unit.monsterHealthbar).to({ x: lineXLocation[unit.lineXIndex] }, 600, 'Linear', true, 0);
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
	unit.damage(damage);
}
//몬스터가 목적지에 도달했다. //몬스터를 사라지게 하고 비토벤의 생명력을 깎는다.
function arriveDestination(unit){
	
	if (unit.speed == 1) {
		if (unit.lineXIndex > 10) {
			unit.monsterSprite.kill();
			unit.monsterHealthbar.kill();
			/////////////////////////////
			/////////////////////////////
			//몬스터가 도달하고 생명력이 다해서 죽었다는 것을 가정
			stageResult(true);
		}
	} else if (unit.speed == 2) {
		if (unit.lineXIndex > 12) {
			unit.monsterSprite.kill();
			unit.monsterHealthbar.kill();
		}					
	}
}