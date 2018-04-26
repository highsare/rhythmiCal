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
		beatZone = true;
	}else if(beat % 5 == 1){
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
		,success:function(motion){
			if(motion == "NOTHING"){
				
			}else if(motion != null){
				motionEvent(motion);
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
function motionEvent(motion){
	
	popupCombo(true);
	timingCheck(true);
	
	switch(motion){
	case "POINT":
		attackLine(monstersA,1);
		break;
	case "UP":
		//라인 설정 필요함
		//stun();
		break;
	case "DOWN":
		//넉백
		for (var i = 0; i < monstersA.length; i++) {
			var unit = monstersA[i];
			knockback(unit,lineYLocation[unit.attackLine]);
		}
		break;
	case "LEFT":
		//stageResult(true);
		break;
	case "RIGHT":
		//stageResult(false);
		break;
	}
}

function timingCheck(timing){
	var notePop;
	if (timing) {
		notePop = game.add.sprite(game.width/2,750,'imgO');
		notePop.anchor.setTo(0.5,0.5);
	}else{
		notePop = game.add.sprite(game.width/2,750,'imgX');
		notePop.anchor.setTo(0.5,0.5);
	}
	notePop.anchor.setTo(0.5,0.5);
	notePop.scale.setTo(1,1);
		
	//이벤트 발생시킴  ( o, x )
	game.time.events.add(
		0 
		,function() {    
			//y좌표까지 이동
			game.add.tween(notePop).to({y: 450}, 500, Phaser.Easing.Linear.None, true);    
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
function popupImage(x, y, imageName, fps, loop) {
	console.log('popupImage');

	popUpImage = game.add.sprite(x, y, imageName);
	popUpImage.animations.add('popup');
	popUpImage.animations.play('popup', fps, loop);
}

/*
 * popupCombo(): 콤보 숫자를 나타내는 메서드
 */
function popupCombo(combo) {
	//콤보 성공 시
	if (combo) { //combo 조건
		isComboNow = true;
		//카운터를 1 증가
		counter++;
		//콤보가 20의 배수일 경우에는 생명력을 1 증가 (임시로 5를 주었음) // TODO
		if (counter % 5 == 0) {
			updateLife(1);
		}
		
	    //숫자 애니메이션 실행
		//카운터를 1 감소시키고(2번째 공격부터 콤보을 적용해야 하므로), 세 자리로 나누어 각 자리의 수를 구한다.
		var firstNum = parseInt(counter.toString().charAt(0));
		var secondNum = parseInt(counter.toString().charAt(1));
		var thirdNum = parseInt(counter.toString().charAt(2));
		
		var number;
		var popup;
		//한 자리일때
		if (isNaN(firstNum) == false && isNaN(secondNum) == true && isNaN(thirdNum) == true) {
			popupImage(512, 400, 'number' + firstNum, 30, false);
		}
		//두 자리일때
		else if (isNaN(firstNum) == false && isNaN(secondNum) == false && isNaN(thirdNum) == true) {
			popupImage(502, 400, 'number' + firstNum, 30, false);
			popupImage(522, 400, 'number' + secondNum, 30, false);
		}
		//세 자리일때
		else if (isNaN(firstNum) == false && isNaN(secondNum) == false && isNaN(thirdNum) == false) {
			popupImage(492, 400, 'number' + firstNum, 30, false);
			popupImage(512, 400, 'number' + secondNum, 30, false);
			popupImage(532, 400, 'number' + thridNum, 30, false);
		}
		
	    //콤보 효과음 실행
	    comboSound.play('comboSound');
	}
	//콤보 실패 시
	else {
		timingCheck(false);
	}
}