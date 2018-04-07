/**
 * 
 */



function jumpchar () {
	//1번 점프 점프
    game.add.tween(syuzincou).to({ y: 350 }, 400, Phaser.Easing.Quadratic.InOut, true, 0, 0, true);
    
    //1초마다 스프라이트 점프 이미지
    anim = syuzincou.animations.add('jump',[0,1],2,false);
    anim.play('jump');
}

//버튼 1번 눌렀을 때
function pressdownone () {
	anim = syuzincou.animations.add('attack');
	anim.play('attack',10, false); //속도
	
}