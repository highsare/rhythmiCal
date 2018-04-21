package com.beatoven.rhythmical.vo;

public class Member {

	// field
	private String id;
	private String pw;
	private String code;
	
	// getters and setters
	public String getId() {return id;}
	public void setId(String id) {this.id = id;}
	public String getPw() {return pw;}
	public void setPw(String pw) {this.pw = pw;}
	public String getCode() {return code;}
	public void setCode(String code) {this.code = code;}
	
	// constructor
	public Member() {}
	public Member(String id, String pw) {
		super();
		this.id = id;
		this.pw = pw;
	}
	
	public Member(String code) {
		super();
		this.code = code;
	}
	
	// toString
	@Override
	public String toString() {
		return "Member [id=" + id + ", pw=" + pw + ", code=" + code+"]";
	}
}
