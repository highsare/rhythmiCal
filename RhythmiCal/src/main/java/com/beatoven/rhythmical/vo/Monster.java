package com.beatoven.rhythmical.vo;

public class Monster {

	private String monsterName;
	private String imgName;
	private int speed;
	private int health;
	private String effectSoundName;
	private String skill;
	
	public Monster() {
		// TODO Auto-generated constructor stub
	}

	public Monster(String monsterName, String imgName, int speed, int health, String effectSoundName, String skill) {
		super();
		this.monsterName = monsterName;
		this.imgName = imgName;
		this.speed = speed;
		this.health = health;
		this.effectSoundName = effectSoundName;
		this.skill = skill;
	}

	public String getMonsterName() {
		return monsterName;
	}

	public void setMonsterName(String monsterName) {
		this.monsterName = monsterName;
	}

	public String getImgName() {
		return imgName;
	}

	public void setImgName(String imgName) {
		this.imgName = imgName;
	}

	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int speed) {
		this.speed = speed;
	}

	public int getHealth() {
		return health;
	}

	public void setHealth(int health) {
		this.health = health;
	}

	public String getEffectSoundName() {
		return effectSoundName;
	}

	public void setEffectSoundName(String effectSoundName) {
		this.effectSoundName = effectSoundName;
	}

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	@Override
	public String toString() {
		return "Monster [monsterName=" + monsterName + ", imgName=" + imgName + ", speed=" + speed + ", health="
				+ health + ", effectSoundName=" + effectSoundName + ", skill=" + skill + "]";
	}
	
	
}
