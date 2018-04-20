package com.beatoven.rhythmical.vo;

public class FamePost {

	// field
	private String id;
	private String text;
	
	// getters and setters
	public String getId() {return id;}
	public void setId(String id) {this.id = id;}
	public String getText() {return text;}
	public void setText(String text) {this.text = text;}
	
	// constructor
	public FamePost() {}
	public FamePost(String id, String text) {
		super();
		this.id = id;
		this.text = text;
	}
	
	// toString
	@Override
	public String toString() {
		return "HonorPost [id=" + id + ", text=" + text + "]";
	}
}
