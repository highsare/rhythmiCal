package com.beatoven.rhythmical.vo;

public class Stage {
	
	private int stageNum;
	private String musicName;
	private String monsterList;
	private String bgImgName;
	
	public Stage() {
		// TODO Auto-generated constructor stub
	}

	public Stage(int stageNum, String musicName, String monsterList, String bgImgName) {
		super();
		this.stageNum = stageNum;
		this.musicName = musicName;
		this.monsterList = monsterList;
		this.bgImgName = bgImgName;
	}

	public int getStageNum() {
		return stageNum;
	}

	public void setStageNum(int stageNum) {
		this.stageNum = stageNum;
	}

	public String getMusicName() {
		return musicName;
	}

	public void setMusicName(String musicName) {
		this.musicName = musicName;
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

	@Override
	public String toString() {
		return "Stage [stageNum=" + stageNum + ", musicName=" + musicName + ", monsterList=" + monsterList
				+ ", bgImgName=" + bgImgName + "]";
	}
	
	
}