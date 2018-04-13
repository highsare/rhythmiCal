/**
 * 
 */


function jumpchar () {
	//1번 점프 점프
    game.add.tween(beatoven).to({ y: 350 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, true);
    
    //1초마다 스프라이트 점프 이미지
    anim = beatoven.animations.add('jump',[0,1],2,false);
    anim.play('jump');
}

//버튼 1번 눌렀을 때
function pressdownone () {
	anim = beatoven.animations.add('attack');
	anim.play('attack',10, false); //속도
}

/*
 * updateLife(): 생명력을 증가시키는 함수. 생명력을 나타내는 변수 life는 콤보가 (카운터 % 20 == 0)일 때 1 증가하도록 되어있음
 * addLife => updateLife 
 */
function updateLife() {
	if(life > 0 && life < maxLife){
		for (var i = 0; i < life; i++) {
			lifeArray[i].visible = true;
		}
		for (var i = life; i < maxLife; i++) {
			lifeArray[i].visible = false;
		}
	}else{
		//Life = 0
	}
	console.log(life);
}

function iniLife(){
	lifeArray = new Array();
	for (var i = 0; i < maxLife; i++){
		lifeArray[i] = game.add.image(i * 30, 30, 'life');
	}
	updateLife();
}