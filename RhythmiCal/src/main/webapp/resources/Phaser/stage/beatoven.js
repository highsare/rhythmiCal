/**
 * 
 */


function jumpchar () {
	//1번 점프 점프
    game.add.tween(beatoven).to({ y: 350 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, true);
    
    //1초마다 스프라이트 점프 이미지
    animBeatoven = beatoven.animations.add('jump',[0,1],2,false);
    animBeatoven.play('jump');
}

function iniLife(){
	
	lifeArray = new Array();
	for (var i = 0; i < maxLife; i++){
		lifeArray[i] = game.add.image(i * 40, 30, 'life');
		lifeArray[i].scale.set(3);
	}
	updateLife(0);
}

/*
 * updateLife(): 생명력을 증가시키는 함수. 생명력을 나타내는 변수 life는 콤보가 (카운터 % 20 == 0)일 때 1 증가하도록 되어있음
 * addLife => updateLife 
 */
function updateLife(lifeChange) {
	life += lifeChange;
	console.log("Update Life In "+life);
	$.ajax({
		url:'saveLife'
		,type:'post'
		,data: {life:life}
		,dataType : 'text'
		,success: function(){
			console.log("Life Updated! > "+life);
		},error: function(){}
	});
	
	if(life > 0 && life < maxLife){
		for (var i = 0; i < life; i++) {
			lifeArray[i].visible = true;
		}
		for (var i = life; i < maxLife; i++) {
			lifeArray[i].visible = false;
		}
	}else{
		//Life = 0
		life = 0;
		//stageResult(false);
	}
	console.log("라이프는"+life);
}
function attackMotion () {
	animBeatoven = beatoven.animations.add('attack');
	animBeatoven.play('attack',25, false); //속도
}