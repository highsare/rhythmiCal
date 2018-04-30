/**
 * 
 */

var townPeoplePositionX = [1420, 1360, 1300, 1000, 940, 810, 620, 550, 490, 200, 120, 110, 90, 200, 480, 560, 620, 1100, 1150, 1200, 1400, 1450, 1500];
var townPeoplePositionY = [70, 80, 70, 80, 60, 80, 60, 80, 70, 100, 130, 600, 700, 750, 800, 730, 800, 780, 740, 780, 810, 750, 800, 780];
var townpeoples = new Array();

//마을 사람들을 만든다.
function createTownPeople(){
	
	for (var i = 0; i < 23; i++) {
		//1 부장
		//2 삼바아저씨
		//3 기타치는 친구
		//4 안경 아줌마
		peopleName = 'tp' + game.rnd.integerInRange(1, 4);
		var tp = new TownPeople(townPeoplePositionX[i], townPeoplePositionY[i], peopleName);
		townpeoples.push(tp);
	}
}

//마을 사람 객체정의
function TownPeople(x, y, peopleName){
	this.peopleName = peopleName;
	this.townPeopleSprite = game.add.sprite(x, y, peopleName, 1);
	this.townPeopleSprite.anchor.setTo(0.5, 0.5);
	this.townPeopleSprite.scale.set(2);
	this.townPeopleSprite.smoothed = false;
	this.animation = this.townPeopleSprite.animations.add('dance');
	this.animation.enableUpdate = true;
	this.townPeopleSprite.animations.play('dance', 8, true);
}

//마을 사람들의 춤추는 속도를 조절하는 기능
function feverdancingControl(frame){
	for (var i = 0; i < townpeoples.length; i++){
		var townPeople = townpeoples[i];
		townPeople.townPeopleSprite.animations.stop();
		townPeople.townPeopleSprite.animations.play('dance', frame, true);
	}
}

//마을 사람들이 낙담한 이미지로 바꿔주는 기능
function changeTownPeopleDepressed(){
	for (var i = 0; i < townpeoples.length; i++) {
		var townPeople = townpeoples[i];
		townPeople.townPeopleSprite.loadTexture('beatoven');
		townPeople.townPeopleSprite.animations.add('depressed');
		townPeople.townPeopleSprite.animations.play('depressed', 20, true);
		townPeople.townPeopleSprite.scale.set(2);
		townPeople.townPeopleSprite.anchor.setTo(0.5, 0.5);
		townPeople.townPeopleSprite.smoothed = false;
	}
}

//마을 사람들이 춤추는 이미지로 바꿔주는 기능
function changeTownPeopleFever(){
	for (var i = 0; i < townpeoples.length; i++) {
		var townPeople = townpeoples[i];
		townPeople.townPeopleSprite.loadTexture(townPeople.peopleName);
		townPeople.townPeopleSprite.animations.add('dance');
		townPeople.townPeopleSprite.animations.play('dance', 8, true);
		townPeople.townPeopleSprite.scale.set(2);
		townPeople.townPeopleSprite.anchor.setTo(0.5, 0.5);
		townPeople.townPeopleSprite.smoothed = false;
	}
}