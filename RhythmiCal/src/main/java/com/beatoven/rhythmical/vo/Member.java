package com.beatoven.rhythmical.vo;

public class Member {

	// field
	private String id;
	private String pw;
	
	// getters and setters
	public String getId() {return id;}
	public void setId(String id) {this.id = id;}
	public String getPw() {return pw;}
	public void setPw(String pw) {this.pw = pw;}
	
	// constructor
	public Member() {}
	public Member(String id, String pw) {
		super();
		this.id = id;
		this.pw = pw;
	}
	
	// toString
	@Override
	public String toString() {
		return "Member [id=" + id + ", pw=" + pw + "]";
	}
}
