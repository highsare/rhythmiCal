/**
 * 
 */

//비트에 맞춰서 보스가 뛴다.
function bossJump(bossEntity) {
	
	var random = game.rnd.integerInRange(1, 10);
	if (random < 4) {
		bossSkill();
		return;
	}
   //1번 점프 점프
    game.add.tween(bossEntity).to({ y: 350 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, true);
    
    //1초마다 스프라이트 점프 이미지
    animBeatoven = beatoven.animations.add('jump',[0,1],2,false);
    animBeatoven.play('jump');
    
}

//노비토 객체
function Boss(game, health, bossSpriteName, bossSpriteSplitNum){
	
   
	this.game = game;
	this.health = health;
	this.maxHealth = health;
	this.status = "STAY"; //STAY , MOVE , STUN, DIE, IMUNE
   
	this.bossSprite = game.add.sprite(1420, game.world.centerY, bossSpriteName, bossSpriteSplitNum); //nobeato = 5
	this.bossSprite.scale.set(4);
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
Boss.prototype.damage = function(damage, bossAttackedSpriteName, bossNomalStatusSpriteName){
	if (this.status == "IMMUNE") {
		//이뮨 효과
	}
   
   //이전의 체력값
   var healthBefore = this.health;
   
   this.health -= damage; 
   
   //체력이 0보다 크다면 체력바 한칸을 없앤다.
   if (this.health >= 0) {
      //데미지를 입어 체력이 깎였다.
      if (healthBefore > this.health) {
         attackedMotionBoss(this.bossSprite, bossAttackedSpriteName, bossNomalStatusSpriteName);
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
      this.bossSprite.kill();
      this.bossHealthbar.kill();
   }
}

//공격 당하는 모션을 보여주는 기능
function attackedMotionBoss(bossSprite, bossAttackedSpriteName, bossNomalStatusSpriteName){
   
   bossSprite.loadTexture(bossAttackedSpriteName); //nobeato = 'nobeatoAttacked'
   bossSprite.animations.add('attackedMotion');
   bossSprite.animations.play('attackedMotion', 10, true);
   bossSprite.scale.set(4);
   bossSprite.anchor.setTo(0.5,1);
   bossSprite.smoothed = false;
   
   setTimeout(function(){
      bossSprite.loadTexture(bossNomalStatusSpriteName); //nobeato - 'nobeato'
      bossSprite.animations.add('bossAni');
      bossSprite.animations.play('bossAni', 10, true);
      bossSprite.scale.set(4);
      bossSprite.anchor.setTo(0.5,1);
      bossSprite.smoothed = false;
   }, 1000); //보스에 따라 피격 애니매이션 필요 시간이 다를 수 있음 차후 변수로 받아서 처리해야 할 수 있다.
   
}

//보스몹 객체 유닛 데미지
function hitBoss(bossEntity, damage, bossAttackedSpriteName, bossNomalStatusSpriteName){
   bossEntity.damage(damage, bossAttackedSpriteName, bossNomalStatusSpriteName);
}


function bossSkill(){
	
}
