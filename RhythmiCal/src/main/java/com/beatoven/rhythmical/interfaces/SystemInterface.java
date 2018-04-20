package com.beatoven.rhythmical.interfaces;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.beatoven.rhythmical.vo.Save;

/*시스템 관련 인터페이스*/

@Mapper
public interface SystemInterface {
	
	//세이브리스트 불러오기
	public ArrayList<Save> getsaveList();
}
