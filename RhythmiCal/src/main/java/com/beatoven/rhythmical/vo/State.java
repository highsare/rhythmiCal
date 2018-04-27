package com.beatoven.rhythmical.vo;

public class State {
	private String state;
	private int contentNum;
	
	public State() {super();}
	
	public State(String state, int contentNum) {
		super();
		this.state = state;
		this.contentNum = contentNum;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public int getContentNum() {
		return contentNum;
	}
	public void setContentNum(int contentNum) {
		this.contentNum = contentNum;
	}	
}
