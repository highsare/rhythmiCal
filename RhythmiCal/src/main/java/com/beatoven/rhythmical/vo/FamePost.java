package com.beatoven.rhythmical.vo;

public class FamePost {

	// field
	private String id;
	private String text;
	private String clearDate;
	
	// getters and setters
	public String getId() {return id;}
	public void setId(String id) {this.id = id;}
	public String getText() {return text;}
	public void setText(String text) {this.text = text;}
	public String getClearDate() {return clearDate;}
	public void setClearDate(String clearDate) {this.clearDate = clearDate;}
	
	// constructor
	public FamePost() {}
	public FamePost(String id, String text) {
		super();
		this.id = id;
		this.text = text;
	}
	public FamePost(String id, String text, String clearDate) {
		super();
		this.id = id;
		this.text = text;
		this.clearDate = clearDate;
	}
	
	// toString
	@Override
	public String toString() {
		return "HonorPost [id=" + id + ", text=" + text + ", clearDate=" + clearDate + "]";
	}
}
