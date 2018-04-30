package com.beatoven.rhythmical.dao;

import java.util.ArrayList;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.beatoven.rhythmical.interfaces.StoryInterface;
import com.beatoven.rhythmical.vo.Story;

/* 스토리 데이터 엑세스 오브젝트*/

@Repository
public class StoryDAO implements StoryInterface {
	@Inject
	SqlSession session;
	@Override
	public ArrayList<Story> selectStory(int storyNum) {
		// TODO Auto-generated method stub
		return session.getMapper(StoryInterface.class).selectStory(storyNum);
	}

	
	
}
