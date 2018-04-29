package com.beatoven.rhythmical.vo;

public class Save {
	
	//field
	private String id;
	private int life;
	private String motionlist;
	private int stateNum;
	
	
	// constructor
	public Save(String id, int life, String motionlist, int stateNum) {
		super();
		this.id = id;
		this.life = life;
		this.motionlist = motionlist;
		this.stateNum = stateNum;
	}
	
	// getters and setters
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getLife() {
		return life;
	}

	public void setLife(int life) {
		this.life = life;
	}

	public String getMotionlist() {
		return motionlist;
	}

	public void setMotionlist(String motionlist) {
		this.motionlist = motionlist;
	}

	public int getStateNum() {
		return stateNum;
	}

	public void setStateNum(int stateNum) {
		this.stateNum = stateNum;
	}

	
}
