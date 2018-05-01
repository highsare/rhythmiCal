package com.beatoven.rhythmical.interfaces;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.beatoven.rhythmical.vo.Save;

/*시스템 관련 인터페이스*/

@Mapper
public interface SystemInterface {
	
	//세이브리스트 불러오기
	public ArrayList<Save> getsaveList();
	
	//세이브 슬롯 만들기
	public int makeSave(Save save);
	
	//라이프 세이브하기
	public int saveLife(Save save);
	
	//세이브에서 스테이트 가져오기
	public String getStateName(String id);

	//세이브에서 스테이트 하나 올리기
	public int addStateNum(String id);
	
	//스테이트와 세이브의 조인에서 contentNum 얻기
	public int getContentNum(String id);
}
