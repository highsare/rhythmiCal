package com.beatoven.rhythmical.vo;

public class Monster {

	private int monsterNum;
	private String monsterName;
	private int speed;
	private int health;
	private String skill;
	private int skillPercentage;
	private String soundEffectNum;
	private String deadSoundNum;
	private int appearanceBeat;
	private int attackline;
	
	public Monster() {
		// TODO Auto-generated constructor stub
	}

	public Monster(int monsterNum, String monsterName, int speed, int health, String skill, int skillPercentage,
			String soundEffectNum, String deadSoundNum, int appearanceBeat, int attackline) {
		super();
		this.monsterNum = monsterNum;
		this.monsterName = monsterName;
		this.speed = speed;
		this.health = health;
		this.skill = skill;
		this.skillPercentage = skillPercentage;
		this.soundEffectNum = soundEffectNum;
		this.deadSoundNum = deadSoundNum;
		this.appearanceBeat = appearanceBeat;
		this.attackline = attackline;
	}

	public int getMonsterNum() {
		return monsterNum;
	}

	public void setMonsterNum(int monsterNum) {
		this.monsterNum = monsterNum;
	}

	public String getMonsterName() {
		return monsterName;
	}

	public void setMonsterName(String monsterName) {
		this.monsterName = monsterName;
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

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	public int getSkillPercentage() {
		return skillPercentage;
	}

	public void setSkillPercentage(int skillPercentage) {
		this.skillPercentage = skillPercentage;
	}

	public String getSoundEffectNum() {
		return soundEffectNum;
	}

	public void setSoundEffectNum(String soundEffectNum) {
		this.soundEffectNum = soundEffectNum;
	}

	public String getDeadSoundNum() {
		return deadSoundNum;
	}

	public void setDeadSoundNum(String deadSoundNum) {
		this.deadSoundNum = deadSoundNum;
	}

	public int getAppearanceBeat() {
		return appearanceBeat;
	}

	public void setAppearanceBeat(int appearanceBeat) {
		this.appearanceBeat = appearanceBeat;
	}

	public int getAttackline() {
		return attackline;
	}

	public void setAttackline(int attackline) {
		this.attackline = attackline;
	}

	@Override
	public String toString() {
		return "Monster [monsterNum=" + monsterNum + ", monsterName=" + monsterName + ", speed=" + speed + ", health="
				+ health + ", skill=" + skill + ", skillPercentage=" + skillPercentage + ", soundEffectNum="
				+ soundEffectNum + ", deadSoundNum=" + deadSoundNum + ", appearanceBeat=" + appearanceBeat
				+ ", attackline=" + attackline + "]";
	}
}