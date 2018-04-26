/**
 * 
 */
//비트에 맞춰서 보스가 뛴다.
function bossesJump(bossEntity) {
	//1번 점프 점프
    game.add.tween(bossEntity).to({ y: 350 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, true);
    
    //1초마다 스프라이트 점프 이미지
    animBeatoven = beatoven.animations.add('jump',[0,1],2,false);
    animBeatoven.play('jump');
}

//노비토 객체
function Nobeato(game){
	
	this.game = game;
	this.health = 50;
	this.maxHealth = 50;
	this.status = "STAY"; //STAY , MOVE , STUN, DIE, IMUNE
	
	this.nobeatoSprite = game.add.sprite(1420, game.world.centerY, 'nobeato', 5);
	this.nobeatoSprite.scale.set(4);
	this.nobeatoSprite.anchor.setTo(0.5, 1);
    this.nobeatoSprite.smoothed = false;
    this.anim = this.nobeatoSprite.animations.add('fly');
    this.nobeatoSprite.animations.play('fly', 10, true);
    
    this.nobeatoHealthbar = game.add.group();
    for (var i = 0; i < this.maxHealth; i++) {
    	
		this.nobeatoHealthbar.create(3 * i, 0, 'healthFill');
		this.nobeatoHealthbar.scale.set(7);
		this.nobeatoHealthbar.children[i].smoothed = false; //차일드로 접근해서 false로 수정
		this.nobeatoHealthbar.children[i].anchor.setTo(0.5, 0.5); //그룹에는 앵커가 없음... ㄷㄷㄷ
		this.nobeatoHealthbar.smoothed = false;
		
    }
    this.nobeatoHealthbar.x = 450;
    this.nobeatoHealthbar.y = 120;
    this.health -= 1; //healthbar index를 위한 처리

    //physics
	game.physics.enable(this.nobeatoSprite, Phaser.Physics.ARCADE);
}

//노비토 객체의 데미지를 받는 함수
Nobeato.prototype.damage = function(damage){
	
	//이전의 체력값
	var healthBefore = this.health;
	
	this.health -= damage;	
	
	//체력이 0보다 크다면 체력바 한칸을 없앤다.
	if (this.health >= 0) {
		//데미지를 입어 체력이 깎였다.
		if (healthBefore > this.health) {
			attackedMotionBosses(this.nobeatoSprite);
			var healthBlank = game.add.sprite(3 * healthBefore, 0, 'healthBlank');
			healthBlank.smoothed = false;
			healthBlank.anchor.setTo(0.5, 0.5);
			this.nobeatoHealthbar.replace(this.nobeatoHealthbar.children[healthBefore], healthBlank);
		} else {//체력이 증가했다.
			if (this.nobeatoHealthbar.children[this.health] != null) {
				var healthFill = game.add.sprite(3 * this.health, 0, 'healthFill');
				healthFill.smoothed = false;
				healthFill.anchor.setTo(0.5, 0.5);
				this.nobeatoHealthbar.replace(this.nobeatoHealthbar.children[this.health], healthFill);
			}
		}
	} else { //체력이 0미만이되면 몬스터와 체력바를 없앤다.
		this.nobeatoSprite.kill();
		this.nobeatoHealthbar.kill();
	}
}

//공격 당하는 모션을 보여주는 기능
function attackedMotionBosses(bossSprite){
	
	bossSprite.loadTexture('nobeatoAttacked');
	bossSprite.animations.add('attackedMotion');
	bossSprite.animations.play('attackedMotion', 10, true);
	bossSprite.scale.set(4);
	bossSprite.anchor.setTo(0.5,1);
	bossSprite.smoothed = false;
	
	setTimeout(function(){
		bossSprite.loadTexture('nobeato');
		bossSprite.animations.add('fly');
		bossSprite.animations.play('fly', 10, true);
		bossSprite.scale.set(4);
		bossSprite.anchor.setTo(0.5,1);
		bossSprite.smoothed = false;
	}, 1000);
	
}

//몬스터 객체 유닛 데미지
function hitBoss(bossEntity, damage){
	bossEntity.damage(damage);
}