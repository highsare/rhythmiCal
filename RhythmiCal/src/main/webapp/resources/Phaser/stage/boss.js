/**
 * 
 */

//비트에 맞춰서 보스가 뛴다.
function bossJump(bossEntity) {
	if (bossEntity.status != "DIE") {
		if (bossEntity != "Nobeato") {
			bossEntity.bossSprite.loadTexture(bossEntity.bossName + 'Jump');
			bossEntity.bossSprite.animations.add('jumpMotion');
			bossEntity.bossSprite.animations.play('jumpMotion', 5, false);
		}
		
		//점프
		game.add.tween(bossEntity.bossSprite).to({ y: 350 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, true);
		
		if (bossEntity != "Nobeato") {
			setTimeout(function(){
				bossEntity.bossSprite.loadTexture(bossEntity.bossName); //nobeato - 'nobeato'
				bossEntity.bossSprite.animations.add('bossAni');
				bossEntity.bossSprite.animations.play('bossAni', 10, true);
			}, 600); //보스에 따라 피격 애니매이션 필요 시간이 다를 수 있음 차후 변수로 받아서 처리해야 할 수 있다.
		}
	}
}

//보스 객체
function Boss(game, health, bossSpriteName){
	
	this.game = game;
	this.health = health;
	this.maxHealth = health;
	this.status = "STAY"; //STAY , MOVE , STUN, DIE, IMUNE
	
	this.bossName = bossSpriteName;
	this.bossSprite = game.add.sprite(1420, game.world.centerY, bossSpriteName); //nobeato = 5
	if (bossSpriteName == 'Nobeato') {
		this.bossSprite.scale.set(6);
	} else if (bossSpriteName == 'Nabo') {
		this.bossSprite.scale.set(8);
	} else {
		this.bossSprite.scale.set(4);
	}
	
	this.bossSprite.anchor.setTo(0.5, 1);
	this.bossSprite.smoothed = false;
	this.anim = this.bossSprite.animations.add('bossAni');
	this.bossSprite.animations.play('bossAni', 10, true); //nobeato = 10인데 일단 고정으로 해보고 아니면 변수로 받기로
	
	this.bossHealthbar = game.add.group();
	for (var i = 0; i < this.maxHealth; i++) {
		
		this.bossHealthbar.create(3 * i, 0, 'healthFill');
		this.bossHealthbar.scale.set(7);
		this.bossHealthbar.children[i].smoothed = false; //차일드로 접근해서 false로 수정
		this.bossHealthbar.children[i].anchor.setTo(0.5, 0.5); //그룹에는 앵커가 없음... ㄷㄷㄷ
		this.bossHealthbar.smoothed = false;
		}
	this.bossHealthbar.x = 450;
	this.bossHealthbar.y = 120;
	this.health -= 1; //healthbar index를 위한 처리

    //physics
	game.physics.enable(this.bossSprite, Phaser.Physics.ARCADE);
}

//노비토 객체의 데미지를 받는 함수
Boss.prototype.damage = function(damage){
	
	//이전의 체력값
	var healthBefore = this.health;
	this.health -= damage;
	
	//체력이 0보다 크다면 체력바 한칸을 없앤다.
	if (this.health >= 0) {
		//데미지를 입어 체력이 깎였다.
		if (healthBefore > this.health) {
			bossHurtMotion(this.bossName, this.bossSprite);
			var healthBlank = game.add.sprite(3 * healthBefore, 0, 'healthBlank');
			healthBlank.smoothed = false;
			healthBlank.anchor.setTo(0.5, 0.5);
			this.bossHealthbar.replace(this.bossHealthbar.children[healthBefore], healthBlank);
			} else {//체력이 증가했다.
				if (this.bossHealthbar.children[this.health] != null) {
					var healthFill = game.add.sprite(3 * this.health, 0, 'healthFill');
					healthFill.smoothed = false;
					healthFill.anchor.setTo(0.5, 0.5);
					this.bossHealthbar.replace(this.bossHealthbar.children[this.health], healthFill);
					}
				}
		} else { //체력이 0미만이되면 몬스터와 체력바를 없앤다.
			var healthBlank = game.add.sprite(3 * healthBefore, 0, 'healthBlank');
			healthBlank.smoothed = false;
			healthBlank.anchor.setTo(0.5, 0.5);
			this.bossHealthbar.replace(this.bossHealthbar.children[healthBefore], healthBlank);
			if (this.status != "DIE") {
				bossDieMotion(this.bossName, this.bossSprite, this.bossHealthbar);
			}
			this.status = "DIE";
			}
	}

//보스몹 맞는 모션
function bossHurtMotion(bossName, bossSprite){
	var aniName = bossName + "Hurt";
	bossSprite.loadTexture(aniName); //맞는 모션이 들어간 스프라이트
	if (bossName == "Nobeato") {
		bossSprite.animations.add('hurtMotion', null, 15, true); //애니메이션 추가
	} else if(bossName == "Nabo"){
		bossSprite.animations.add('hurtMotion', null, 15, true); //애니메이션 추가
	} else {
		bossSprite.animations.add('hurtMotion', null, 5, false); //애니메이션 추가
		
	}
	bossSprite.animations.play('hurtMotion'); //애니메이션 실행
	
	setTimeout(function(){//맞는 모션을 실행한 후에 다시 돌려주는 함수
		bossSprite.loadTexture(bossName); //다시 돌아갈 스프라이트
		bossSprite.animations.add('walk', null, 10, true);
		bossSprite.animations.play('walk');
		}, 1000); //스프라이트 되돌릴 시간 설정
}

//보스몹 죽는 모션
function bossDieMotion(bossName, bossSprite, bossHealthbar){
	var aniName = bossName + "Die";
	bossSprite.loadTexture(aniName); //맞는 모션이 들어간 스프라이트
	if (bossName == 'Nobeato') {
		bossSprite.animations.add('DieMotion', null, 7, false); //애니메이션 추가
	} else if (bossName == 'Nabo') {
		bossSprite.animations.add('DieMotion', null, 11, false); //애니메이션 추가
	} else {
		bossSprite.animations.add('DieMotion', null, 13, false); //애니메이션 추가
	}
	bossSprite.play('DieMotion'); //애니메이션 실행
	
	setTimeout(function(){//죽는 모션을 실행한 후에 다시 돌려주는 함수
		bossSprite.kill();
		bossHealthbar.kill();
	}, 500); //스프라이트를 없애는 시간 설정
}

//보스몹 객체 유닛 데미지
function hitBoss(bossEntity, damage){
	bossEntity.damage(damage);
}
