package com.beatoven.rhythmical.vo;

public class Member {

	// field
	private String id;
	private String password;
	private String code;
	
	// getters and setters
	public String getId() {return id;}
	public void setId(String id) {this.id = id;}
	public String getPassword() {return password;}
	public void setPassword(String password) {this.password = password;}
	public String getCode() {return code;}
	public void setCode(String code) {this.code = code;}
	
	// constructor
	public Member() {}
	public Member(String id, String password) {
		super();
		this.id = id;
		this.password = password;
	}
	
	public Member(String code) {
		super();
		this.code = code;
	}
	
	// toString
	@Override
	public String toString() {
		return "Member [id=" + id + ", password=" + password + ", code=" + code+"]";
	}
}
