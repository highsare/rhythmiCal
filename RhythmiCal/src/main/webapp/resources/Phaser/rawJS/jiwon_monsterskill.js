/**
 * 
 */
function explosion(monster, arrayA, arrayB, arrayC){
	var monsterAttackLine = monster.attackLine;
	var monsterLocationY = lineYLocation[monster.attackLine];
	var monsterLocationX = monster.lineX;
	var monsterInRange = new Array();

	for (var i = 0; i < arrayA.length; i++) {
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
	
	for (var j = 0; j < arrayB.length; j++) {
		if (arrayB[j].lineX < monsterLocationX + 150 || arrayB[j].lineX > monsterLocationX - 150) {
			if (monsterAttackLine == 0) {
				if (monsterLocationY + 95 * 3 > lineYLocation[arrayB[j].attackLine] || monsterLocationY - 95 < lineYLocation[arrayB[j].attackLine]) {
					monsterInRange.push(arrayB[j]);
				}
			} else if (monsterAttackLine == 1) {
				if (monsterLocationY + 95 * 3 > lineYLocation[arrayB[j].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayB[j].attackLine]) {
					monsterInRange.push(arrayB[j]);
				}
			} else if (monsterAttackLine == 2) {
				if (monsterLocationY + 95 > lineYLocation[arrayB[j].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayB[j].attackLine]) {
					monsterInRange.push(arrayB[j]);
				}
			}
		}
	}
	
	for (var k = 0; k < arrayC.length; k++) {
		if (arrayC[k].lineX < monsterLocationX + 150 || arrayC[k].lineX > monsterLocationX - 150) {
			if (monsterAttackLine == 0) {
				if (monsterLocationY + 95 * 3 > lineYLocation[arrayC[k].attackLine] || monsterLocationY - 95 < lineYLocation[arrayC[k].attackLine]) {
					monsterInRange.push(arrayC[k]);
				}
			} else if (monsterAttackLine == 1) {
				if (monsterLocationY + 95 * 3 > lineYLocation[arrayC[k].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayC[k].attackLine]) {
					monsterInRange.push(arrayC[k]);
				}
			} else if (monsterAttackLine == 2) {
				if (monsterLocationY + 95 > lineYLocation[arrayC[k].attackLine] || monsterLocationY - 95 * 3 < lineYLocation[arrayC[k].attackLine]) {
					monsterInRange.push(arrayC[k]);
				}
			}
		}
	}
	
	for (var l = 0; l < monsterInRange.length; l++) {
		hitMonster(monsterInRange[l], 1);
	}
}