package com.beatoven.rhythmical.vo;

public class Story {

	private int contentOrder;
	private int storyNum;
	private String content;
	private String bgImgName;
	private String bgMusicName;
	private String characterName;
	
	
	
	public Story() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Story(int contentOrder, int storyNum, String content, String bgImgName, String bgMusicName,
			String characterName) {
		super();
		this.contentOrder = contentOrder;
		this.storyNum = storyNum;
		this.content = content;
		this.bgImgName = bgImgName;
		this.bgMusicName = bgMusicName;
		this.characterName = characterName;
	}

	public int getContentOrder() {
		return contentOrder;
	}
	public void setContentOrder(int contentOrder) {
		this.contentOrder = contentOrder;
	}
	public int getStoryNum() {
		return storyNum;
	}
	public void setStoryNum(int storyNum) {
		this.storyNum = storyNum;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getBgImgName() {
		return bgImgName;
	}
	public void setBgImgName(String bgImgName) {
		this.bgImgName = bgImgName;
	}
	public String getBgMusicName() {
		return bgMusicName;
	}
	public void setBgMusicName(String bgMusicName) {
		this.bgMusicName = bgMusicName;
	}
	public String getCharacterName() {
		return characterName;
	}
	public void setCharacterName(String characterName) {
		this.characterName = characterName;
	}
	@Override
	public String toString() {
		return "Story [contentOrder=" + contentOrder + ", storyNum=" + storyNum + ", content=" + content
				+ ", bgImgName=" + bgImgName + ", bgMusicName=" + bgMusicName + ", characterName=" + characterName
				+ "]";
	}
	
	
	
	
}
