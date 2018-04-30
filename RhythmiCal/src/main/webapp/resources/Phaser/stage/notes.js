/**
 * 머지 확인용입니다.
 */

//노트의 스피드를 추후 셋팅한다.
function createNotes() {
	if(currentBeat >= beatStart){
		//1~4번중 랜덤으로 번호 생성해서 userNumber에 할당
		userNumber = game.rnd.integerInRange(1,multiNum);
		genNote = 'note' + userNumber; //ex: note3
		//랜덤유저 음표 생성(생성하는 위치)
		var note = game.add.sprite(game.width/2 + 310, 730, genNote);
		note.anchor.setTo(0.5, 0.5);
		note.scale.set(0.5);
		game.add.tween(note).to({x:game.width/2 - 310},2000,'Linear',true,0).onComplete.add(function(note){
			note.kill();
		},note);
	}
}