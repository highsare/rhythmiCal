package com.beatoven.rhythmical.interfaces;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.beatoven.rhythmical.vo.Story;

/*스토리 관련 인터페이스*/

@Mapper
public interface StoryInterface {

	public ArrayList<Story> selectStory(int storynum);
	
	public ArrayList<Story> selectStroyJP(int storynum);
}
