/**
 * 
 */

/*
 * 입력이 가능한 타이밍을 설정하는 메소드이다.
 * BPM의 앞,뒤 일정 시간에 beatZone 변수를 토글시킨다.
 * 입력 가능 타이밍이 지나도 모션입력이 없을 경우 popupCombo(false)를 호출하여 콤보를 깨뜨린다.
 * 입력 가능 타이밍 내에 모션입력이 행해진 경우 isComboNow 변수를 다시 false로 세팅한다.
*/
function toggleBeatZone(){
	beat++;
	if(beat == 5){
		beat = 0;
	}
	if(beat % 5 == 4){
		tempNote = userNumber;
		beatZone = true;
	}else if(beat % 5 == 1){
		tempNote = 0;
		beatZone = false;
		if(!isComboNow){
			popupCombo(false);
		}else{
			isComboNow = false;
		}
	}
}

function motionCheck(){
	//여기서 모션의 값이 있는지 확인한 뒤 적절한 반응을 준다.
	//모션 확인
	$.ajax({
		url:"requestMotion"
		,type:"post"
		,success:function(str){
			if(str == "NOTHING"){
				
			}else if(str != null){
				var motionAndCode = str.split('/');
				player = motionAndCode[0];
				motion = motionAndCode[1];
				
				console.log(player);
				console.log(motion);
				
				motionEvent(player,motion);
			}
		},error:function(){
		}
	})
	//적절한 이벤트 함수 호출
}

//정확하지 못한 타이밍일때의 처리
function wrongTiming(){
	$.ajax({
		url:"requestMotion"
		,type:"post"
		,success:function(motion){
			if(motion != "NOTHING"){
				popupCombo(false);
			}
		}
	})
}

//정확한 타이밍에서의 처리
function motionEvent(player,motion){
	var code;
	switch(player){
	case "player1":
		code = 1;
		break;
	case "player2":
		code = 2;
		break;
	case "player3":
		code = 3;
		break;
	case "player4":
		code = 4;
		break;
		default:break;
	}
	console.log(tempNote);
	if (code != tempNote) {
		popupCombo(false);
		return;
	}
	
	
	popupCombo(true);
	timingCheck(true);
	
	console.log("MotionEvent");
	console.log(motion);
	console.log(point_isA);
	console.log(point_isB);
	console.log(point_isC);
	console.log(left_isA);
	console.log(left_isB);
	console.log(left_isC);
	console.log(right_isA);
	console.log(right_isB);
	console.log(right_isC);
	
	attackMotion();
	//모션에 따른 효과 설정
	switch(motion){
	case "POINT"://데미지 3
		if (point_isA) {
			attackLine(monstersA, 1);
			attackLine(monstersA, 1);
			attackLine(monstersA, 1);
			playAttackEffect(310, 140, 'PointEffect');			
		}else if (point_isB) {
			attackLine(monstersB, 1);
			attackLine(monstersB, 1);
			attackLine(monstersB, 1);
			playAttackEffect(280, 340, 'PointEffect');
		}else if (point_isC) {
			attackLine(monstersC, 1);
			attackLine(monstersC, 1);
			attackLine(monstersC, 1);
			playAttackEffect(250, 540, 'PointEffect');	
		}
		break;
	case "UP"://스턴
		if (up_isA) {
			playAttackEffect(310, 140, 'StunEffect');
			stun(monstersA);
		}else if (up_isB) {
			playAttackEffect(280, 340, 'StunEffect');
			stun(monstersB);
		}else if(up_isC) {
			playAttackEffect(250, 540, 'StunEffect');
			stun(monstersC);			
		}
		break;
	case "DOWN"://넉백
		if (down_isA) {
			playAttackEffect(310, 140, 'KnockBackEffect');
			knockback(monstersA,lineYLocation[0]);			
		}else if (down_isB) {
			playAttackEffect(280, 340, 'KnockBackEffect');
			knockback(monstersB,lineYLocation[1]);
		}else if (down_isC) {
			playAttackEffect(250, 540, 'KnockBackEffect');
			knockback(monstersC,lineYLocation[2]);			
		}
		break;
	case "LEFT"://레인 2개
		if (left_isA) {
			attackLine(monstersA, 1);
			playAttackEffect(310, 140, 'NomalAttackEffect');
		}
		if (left_isB) {
			attackLine(monstersB, 1);
			playAttackEffect(280, 340, 'NomalAttackEffect');
		}
		if (left_isC) {
			attackLine(monstersC, 1);
			playAttackEffect(250, 540, 'NomalAttackEffect');
		}
		break;
	case "RIGHT"://레인2개
		if (right_isA) {
			attackLine(monstersA, 1);
			playAttackEffect(310, 140, 'NomalAttackEffect');
		}
		if (right_isB) {
			attackLine(monstersB, 1);
			playAttackEffect(280, 340, 'NomalAttackEffect');
		}
		if (right_isC) {
			attackLine(monstersC, 1);
			playAttackEffect(250, 540, 'NomalAttackEffect');
		}
		break;
	}
}

function playAttackEffect(x, y, effectName){
	var effect = game.add.sprite(x, y, effectName);
	effect.anchor.setTo(0, 0);
	effect.scale.set(1);
	anim = effect.animations.add('play', null, 15, false);
	anim.play('play').onComplete.add(function(effect){
		effect.kill();
	});
}

function timingCheck(timing){
	var notePop;
	var noteAni;
	if (timing) {
		notePop = game.add.sprite(game.width/2,750,'imgO');
	}else{
		notePop = game.add.sprite(game.width/2,750,'imgX');
	}
	notePop.anchor.setTo(0.5,0.5);
	notePop.scale.setTo(1,1);
	noteAni = notePop.animations.add('play', null, 15, true);
	noteAni.play('play');
	//이벤트 발생시킴  ( o, x )
	game.time.events.add(
		0 
		,function() {        
			//그러면서 투명도0 까지 변화면서 사라짐
			game.add.tween(notePop).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
			}
		, this);
}

/* 
 * popupImage(): 이미지를 팝업하는 메서드
 * int x: x축의 좌표
 * int y: y축의 좌표
 * String imageName: preload()에서 설정한 이미지명
 * int fps: 초당 호출할 프레임 수
 * boolean loop: 반복여부
 */
function popupImage(x, y, imageName, fps, loop,scale) {
	console.log('popupImage');

	popUpImage = game.add.sprite(x, y, imageName);
	popUpImage.animations.add('popup');
	popUpImage.animations.play('popup', fps, loop);
	popUpImage.scale.set(scale);
}

/*
 * popupCombo(): 콤보 숫자를 나타내는 메서드
 */
function popupCombo(combo) {
	//콤보 성공 시
	if (combo) { //combo 조건
		isComboNow = true;
		//카운터를 1 증가
		comboCnt++;
		feverdancingControl(comboCnt);
		//콤보가 20의 배수일 경우에는 생명력을 1 증가 (임시로 5를 주었음) // TODO
		if (comboCnt % 10 == 0) {
			//환호하는 군중
			//화려한 콤보 이펙트
		}
		if (comboCnt % 20 == 0) {
			updateLife(1);
		}
		
	    //숫자 애니메이션 실행
		//카운터를 1 감소시키고(2번째 공격부터 콤보을 적용해야 하므로), 세 자리로 나누어 각 자리의 수를 구한다.
		var firstNum = parseInt(comboCnt.toString().charAt(0));
		var secondNum = parseInt(comboCnt.toString().charAt(1));
		var thirdNum = parseInt(comboCnt.toString().charAt(2));
		
		var number;
		var popup;
		//한 자리일때
		if (isNaN(firstNum) == false && isNaN(secondNum) == true && isNaN(thirdNum) == true) {
			popupImage(game.world.centerX, 400, 'number' + firstNum, 30, false,3);
		}
		//두 자리일때
		else if (isNaN(firstNum) == false && isNaN(secondNum) == false && isNaN(thirdNum) == true) {
			popupImage(game.world.centerX - 30, 400, 'number' + firstNum, 30, false,3);
			popupImage(game.world.centerX + 30, 400, 'number' + secondNum, 30, false,3);
		}
		//세 자리일때
		else if (isNaN(firstNum) == false && isNaN(secondNum) == false && isNaN(thirdNum) == false) {
			popupImage(game.world.centerX - 60, 400, 'number' + firstNum, 30, false,3);
			popupImage(game.world.centerX, 400, 'number' + secondNum, 30, false,3);
			popupImage(game.world.centerX + 60, 400, 'number' + thridNum, 30, false,3);
		}
		
	    //콤보 효과음 실행
	    comboSound.play('comboSound');
	}
	//콤보 실패 시
	else {
		//낙담하는 군중
		comboCnt = 0;
		feverdancingControl(comboCnt);
		timingCheck(false);
	}
}