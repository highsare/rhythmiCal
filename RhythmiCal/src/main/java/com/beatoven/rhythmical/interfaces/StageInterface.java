package com.beatoven.rhythmical.interfaces;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.beatoven.rhythmical.vo.Monster;
import com.beatoven.rhythmical.vo.Stage;


/*스테이지 관련 인터페이스*/

@Mapper
public interface StageInterface {

	//stage테이블에서 stageNum을 통해 해당 스테이지의 모든 값을 받아온다.
	public Stage getStage(int stageNum);
	
	//BGM테이블에서 BGMName을 통해 beat값을 받아온다.
	public int getBPM(String BGMName);
	
	//monster테이블에서 몬스터테이블을 받아온다.
	public ArrayList<Monster> getMonsterTable();
}
