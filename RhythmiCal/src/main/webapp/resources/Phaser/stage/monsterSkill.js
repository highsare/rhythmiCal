/**
 * 
 */

//폭발 데미지를 받을 배열을 생성한다.
function explosion(monsterAttackLine, monsterLocationX, arrayA, arrayB, arrayC){
	var monsterLocationY = lineYLocation[monsterAttackLine];
	var monsterInRange = new Array();
	//A라인의 범위에 있는 몬스터
	for (var i = 0; i < arrayA.length; i++) {
		if (arrayA[i].status != "DIE" && arrayA[i].status != "STAY") {
			if (arrayA[i].lineX < monsterLocationX + 150 || arrayA[i].lineX > monsterLocationX - 150) {
				if (monsterAttackLine == 0) {
					if (monsterLocationY + 95 * 3 > lineYLocation[arrayA[i].attackLine] || monsterLocationY - 95 < lineYLocation[arrayA[i].attackLine]) {
						monsterInRange.push(arrayA[i]);
					}
				} else if (monsterAttackLine == 1) {
					if (monsterLocationY + 95 * 3 > lineYLocation[arrayA[i].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayA[i].attackLine]) {
						monsterInRange.push(arrayA[i]);
					}
				} else if (monsterAttackLine == 2) {
					if (monsterLocationY + 95 > lineYLocation[arrayA[i].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayA[i].attackLine]) {
						monsterInRange.push(arrayA[i]);
					}
				}
			}
		}
	}
	//B라인의 범위에 있는 몬스터
	for (var i = 0; i < arrayB.length; i++) {
		if (arrayB[i].status != "DIE" && arrayB[i].status != "STAY") {
			if (arrayB[i].lineX < monsterLocationX + 150 || arrayB[i].lineX > monsterLocationX - 150) {
				if (monsterAttackLine == 0) {
					if (monsterLocationY + 95 * 3 > lineYLocation[arrayB[i].attackLine] || monsterLocationY - 95 < lineYLocation[arrayB[i].attackLine]) {
						monsterInRange.push(arrayB[i]);
					}
				} else if (monsterAttackLine == 1) {
					if (monsterLocationY + 95 * 3 > lineYLocation[arrayB[i].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayB[i].attackLine]) {
						monsterInRange.push(arrayB[i]);
					}
				} else if (monsterAttackLine == 2) {
					if (monsterLocationY + 95 > lineYLocation[arrayB[i].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayB[i].attackLine]) {
						monsterInRange.push(arrayB[i]);
					}
				}
			}
		}
	}
	//C라인의 범위에 있는 몬스터
	for (var i = 0; i < arrayC.length; i++) {
		if (arrayC[i].status != "DIE" && arrayC[i].status != "STAY") {
			if (arrayC[i].lineX < monsterLocationX + 150 || arrayC[i].lineX > monsterLocationX - 150) {
				if (monsterAttackLine == 0) {
					if (monsterLocationY + 95 * 3 > lineYLocation[arrayC[i].attackLine] || monsterLocationY - 95 < lineYLocation[arrayC[i].attackLine]) {
						monsterInRange.push(arrayC[i]);
					}
				} else if (monsterAttackLine == 1) {
					if (monsterLocationY + 95 * 3 > lineYLocation[arrayC[i].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayC[i].attackLine]) {
						monsterInRange.push(arrayC[i]);
					}
				} else if (monsterAttackLine == 2) {
					if (monsterLocationY + 95 > lineYLocation[arrayC[i].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayC[i].attackLine]) {
						monsterInRange.push(arrayC[i]);
					}
				}
			}
		}
	}
	//범위에 있는 몬스터에게 데미지를 먹인다.
	for (var i = 0; i < monsterInRange.length; i++) {
		hitMonster(monsterInRange[i], 1);
	}
}

var cloudArray = [0,1];
var cloudIndex = 0;
/*노트를 가리는 구름 등을 차례로 소환하는 스킬*/
function ruinNoteBar(){
	cloudIndex++;
	//노트바의 위치에 차례차례 생성
	game.add.sprite(game.world.centerX - 200 + cloudIndex*30, 750 ,'imgO');
}

//몬스터와 높이를 받아서 넉백시킨다.
function knockback(unitArray, maximumHeightOnAttackLine){
	for (var i = 0; i < unitArray.length; i++) {
		var unit = unitArray[i];
		if (unit.monsterNum != 1) {
			var destination = unit.lineX + jumpX[unit.attackLine]*3;
			//점프 높이
			//game.add.tween(unit.monsterSprite).to({ y: maximumHeightOnAttackLine - 100 }, 300, "Sine.easeInOut", true, 0, 0, true);
			//game.add.tween(unit.monsterHealthbar).to({ y: maximumHeightOnAttackLine - 20 }, 300, "Sine.easeInOut", true, 0, 0, true);
			//이동 거리
			game.add.tween(unit.monsterSprite).to({ x: destination }, 600, Phaser.Easing.Exponential.EaseOut, true, 0);
			game.add.tween(unit.monsterHealthbar).to({ x: destination }, 600, Phaser.Easing.Exponential.EaseOut, true, 0);
			
			unit.lineX = destination;
		}
	}
}

//excutionBeat의 배수가 되면 몬스터의 상태를 바꾼다.
function changeMonsterStatus(unit, executionBeat, status){
	for (var i = 1; i < 20; i++) {
		if (executionBeat * i == currentBeat) {
			unit.status = status;
		}	
	}
}

//해당 열에 스턴을 먹인다.
function stun(array){
	for (var i = 0; i < array.length; i++) {
		array[i].status = "STUN";
	}
}

