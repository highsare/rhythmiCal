package com.beatoven.rhythmical.dao;

import java.util.ArrayList;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.beatoven.rhythmical.vo.Monster;
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
	public Integer getBPM(String bgmName) {
		// TODO jiwon
		int result = 0;
		try {
			result = session.getMapper(StageInterface.class).getBPM(bgmName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public ArrayList<Monster> getMonsterTable() {
		// TODO jiwon
				ArrayList<Monster> result = null;
				try {
					result = session.getMapper(StageInterface.class).getMonsterTable();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return result;
	}
	
}
