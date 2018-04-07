/**
 * 
 */

/* 
 * popupImage(): 이미지를 팝업하는 메서드
 * 
 * int x: x축의 좌표
 * int y: y축의 좌표
 * String imageName: preload()에서 설정한 이미지명
 * int fps: 초당 호출할 프레임 수
 * boolean loop: 반복여부
 
//var image;
function popupImage(x, y, imageName, fps, loop) {
	console.log('popupImage');

	image = game.add.sprite(x, y, imageName);
	image.animations.add('popup');
	image.animations.play('popup', fps, loop);
}


 * popupCombo(): 콤보 숫자를 나타내는 메서드
 *
 * int clickTime: 클릭 시간(game.time.now)
 
var counter = 0;
var isComboNow = false;
function popupCombo(combo) {
	
	//첫 공격에 시간 저장
	if (counter == 0) {
		//previousTime = game.time.now;
		counter++;
		console.log('첫 공격_previousTime: ' + previousTime);
		return;
	}
	
	//콤보 성공 시
	if (combo) { //combo 조건
		
		isComboNow = true;
		
		//카운터를 1 증가
		counter++;
		
		//텍스트 변경
		text.setText('Combo: ' + counter);
		
		//콤보가 20의 배수일 경우에는 생명력을 1 증가 (임시로 5를 주었음) // TODO
		if (counter % 5 == 0) {
			life++;
			addLife();
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
		console.log('combo failure');
		counter = 0;
		text.setText('Combo Failure');
	}
}*/