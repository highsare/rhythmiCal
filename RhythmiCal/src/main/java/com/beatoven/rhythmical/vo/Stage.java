package com.beatoven.rhythmical.vo;

public class Stage {
	
	private int stageNum;
	private String bgmName;
	private String monsterList;
	private String bgImgName;
	private String bossName;

	public Stage() {
		// TODO Auto-generated constructor stub
	}

	public Stage(int stageNum, String bgmName, String monsterList, String bgImgName, String bossName) {
		super();
		this.stageNum = stageNum;
		this.bgmName = bgmName;
		this.monsterList = monsterList;
		this.bgImgName = bgImgName;
		this.bossName = bossName;
	}

	public int getStageNum() {
		return stageNum;
	}

	public void setStageNum(int stageNum) {
		this.stageNum = stageNum;
	}

	public String getBgmName() {
		return bgmName;
	}

	public void setBgmName(String bgmName) {
		this.bgmName = bgmName;
	}

	public String getMonsterList() {
		return monsterList;
	}

	public void setMonsterList(String monsterList) {
		this.monsterList = monsterList;
	}

	public String getBgImgName() {
		return bgImgName;
	}

	public void setBgImgName(String bgImgName) {
		this.bgImgName = bgImgName;
	}

	public String getBossName() {
		return bossName;
	}

	public void setBossName(String bossName) {
		this.bossName = bossName;
	}

	@Override
	public String toString() {
		return "Stage [stageNum=" + stageNum + ", bgmName=" + bgmName + ", monsterList=" + monsterList + ", bgImgName="
				+ bgImgName + ", bossName=" + bossName + "]";
	}
	
}