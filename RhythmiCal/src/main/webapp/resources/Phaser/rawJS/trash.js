/**
 * 
 */
//보스몹이 랜덤으로 스킬을 사용하고 랜덤으로 라인을 지정해 버프를 건다.
function bossUseBuffSkill(bossEntity){
	var skillPercentage = bossEntity.skillPercentage;
	//1~10번중 랜덤으로 번호 생성해서 random에 할당
	var random = game.rnd.integerInRange(1, 10);
	if (random <= skillPercentage) {
		var randomLineBuff = game.rnd.integerInRange(0, 2);
		switch (randomLineBuff) {
		case 0:
			for (var i = 0; i < monstersA.length; i++) {
				if (monstersA[i].status != "STAY") {
					monstersA[i].speed++;
				}
			}
			break;
		case 1:
			for (var i = 0; i < monstersB.length; i++) {
				if (monstersB[i].status != "STAY") {
					monstersB[i].speed++;
				}
			}
			break;
		case 2:
			for (var i = 0; i < monstersC.length; i++) {
				if (monstersC[i].status != "STAY") {
					monstersC[i].speed++;
				}
			}
			break;
		default:
			break;
		}
	}
}