package com.beatoven.rhythmical.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.beatoven.rhythmical.vo.Stage;
import com.beatoven.rhythmical.interfaces.StageInterface;

/* 스테이지 데이터 엑세스 오브젝트*/

@Repository
public class StageDAO implements StageInterface{
	
	@Inject
	SqlSession session;

	@Override
	public Stage getStage(int stageNum) {
		// TODO jiwon
		Stage result = null;
		try {
			result = session.getMapper(StageInterface.class).getStage(stageNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public int getBeat(String musicName) {
		// TODO jiwon
		int result = 0;
		try {
			result = session.getMapper(StageInterface.class).getBeat(musicName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	
}
