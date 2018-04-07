/**
 * 
 */

//노트의 스피드를 추후 셋팅한다.
function createNotes() {
	//1~4번중 랜덤으로 번호 생성해서 userNumber에 할당
	userNumber = 'note' + game.rnd.integerInRange(1,4); //ex: note3
	//랜덤유저 음표 생성(생성하는 위치)
	var note = game.add.sprite(game.width/2+150, 750,userNumber);
	game.add.tween(note).to({x:game.width/2-150},2000,'Linear',true,0).onComplete.add(function(note){
		note.kill();
	},note);
}