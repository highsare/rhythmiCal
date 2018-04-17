package com.beatoven.rhythmical.vo;

public class HonorPost {

	// field
	private String id;
	private String content;
	
	// getters and setters
	public String getId() {return id;}
	public void setId(String id) {this.id = id;}
	public String getContent() {return content;}
	public void setContent(String content) {this.content = content;}
	
	// constructor
	public HonorPost() {}
	public HonorPost(String id, String content) {
		super();
		this.id = id;
		this.content = content;
	}
	
	// toString
	@Override
	public String toString() {
		return "HonorPost [id=" + id + ", content=" + content + "]";
	}
}
