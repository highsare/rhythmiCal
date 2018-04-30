//preload
function preload() {
	game.load.spritesheet('mummy', 'resources/jiwon_attackline/img/metalslug_mummy37x45.png', 37, 45, 18);
	game.load.spritesheet('healthFill', 'resources/jiwon_attackline/img/healthFill.png', 32, 32, 1);
	game.load.spritesheet('healthBlank', 'resources/jiwon_attackline/img/healthBlank.png', 32, 32, 1);
	game.load.spritesheet('msgclear', 'resources/jiwon_stageResult/clear.png', 32, 32, 5);
	game.load.spritesheet('msgfail', 'resources/jiwon_stageResult/fail.png', 32, 32, 4);
	game.load.image('blackScreen', 'resources/jiwon_stageResult/black.png');
}
//몬스터 객체
function Monster(game, attackLine, speed, lineXIndex, startYOnAttackLine){
	
	this.game = game;
	this.attackLine = attackLine;
	this.speed = speed;
	this.health = 3;
	this.lineXIndex = lineXIndex;
	this.maxHealth = 3;//필요없는듯... 처음에 db에서 받은 fullHP로 for문을 돌려서 생성함으로...
	this.monsterHight = 50;
	
	this.monsterSprite = game.add.sprite(1075, startYOnAttackLine, 'mummy', 5);
	this.monsterSprite.scale.set(2);
    this.monsterSprite.smoothed = false;
    this.anim = this.monsterSprite.animations.add('walk');
    this.monsterSprite.animations.play('walk', 20, true);
    
    this.monsterHealthbar = game.add.group();
    for (var i = 0; i < this.maxHealth; i++) {//maxHealth대신에 health를 쓰면 될 듯
    	
		this.monsterHealthbar.create(3 * i, 0, 'healthFill');
		this.monsterHealthbar.scale.set(2);
		this.monsterHealthbar.smoothed = false;
    }
    this.monsterHealthbar.x = 1075;
    this.monsterHealthbar.y = startYOnAttackLine - this.monsterHight;
    
    //physics
	game.physics.enable(this.monsterSprite, Phaser.Physics.ARCADE);
}

//몬스터 객체의 체력을 업데이트 할 객체에 정의된 함수
Monster.prototype.damage = function(){
	
	//체력을 깎는다.
	this.health -= 1;
	
	//체력이 0보다 크다면 체력바 한칸을 없앤다.
	if (this.health >= 0) {
		this.monsterHealthbar.children[this.health].kill();
	}
	
	//체력이 0이되면 몬스터를 없앤다.
	if (this.health <= 0) {
		this.monsterSprite.kill();
	}
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
	
	if (currentBeat >= 4) {
		hitMonster(monster1);
		hitMonster(monster2);
	}

	if (currentBeat >= 6) {
		hitMonster(monster3);
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
	game.add.tween(unit.monsterHealthbar).to({ y: lineYLocation[unit.attackLine] - (200 - unit.monsterHight) }, 300, "Sine.easeInOut", true, 0, 0, true);
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