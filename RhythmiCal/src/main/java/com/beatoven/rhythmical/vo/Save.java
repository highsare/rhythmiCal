package com.beatoven.rhythmical.vo;

public class Save {
	
	//field
	private String id;
	private int life;
	private String motionlist;
	private String state;
	private int stagenum;
	private int storynum;
	
	
	// constructor
	public Save(String id, int life, String motionlist, String state, int stagenum, int storynum) {
		super();
		this.id = id;
		this.life = life;
		this.motionlist = motionlist;
		this.state = state;
		this.stagenum = stagenum;
		this.storynum = storynum;
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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getStagenum() {
		return stagenum;
	}

	public void setStagenum(int stagenum) {
		this.stagenum = stagenum;
	}

	public int getStorynum() {
		return storynum;
	}

	public void setStorynum(int storynum) {
		this.storynum = storynum;
	}
	
	// toString
	@Override
	public String toString() {
		return "Save [id=" + id + ", life=" + life + ", motionlist=" + motionlist + ", state=" + state + ", stagenum="
				+ stagenum + ", storynum=" + storynum + "]";
	}
	
	
	
	
	
	
	

}
