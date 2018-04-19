package com.beatoven.rhythmical.controller;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.beatoven.rhythmical.dao.StageDAO;
import com.beatoven.rhythmical.vo.Stage;

/*스테이지에서 호출되는 모든 서버로의 요청은 이곳에서 진행됩니다.*/

@Controller
public class StageController {
	
	private String motionBox;
	private boolean isUsed = false;

	@Inject
	StageDAO stageDAO;
	
	//모션 값 받아오기
	@ResponseBody
	@RequestMapping(value="sendMotion", method = RequestMethod.POST)
	public String receiveMotion(String request,String motion) {
		motionBox = motion;
		System.out.println(motionBox);
		return "received";
	}
	
	//모션 값 페이저로 전달
	@ResponseBody
	@RequestMapping(value="requestMotion", method = RequestMethod.POST)
	public String requestMotion() {
		if(motionBox != null) {
			if (isUsed) {
				System.out.println("[Motion empty]");
				motionBox = null;
				isUsed = false;
			}else {
				System.out.println("Motion requested"+motionBox);
				isUsed = true;
				return motionBox;	
			}
		}
		return "NOTHING";
	}
	
	//stageNum을 통해서 stage생성에 필요한 정보를 받아온다.
	@ResponseBody
	@RequestMapping(value="getStage", method = RequestMethod.POST)
	public ArrayList<Object> getStage(int stageNum) {
		
		ArrayList<Object> stageInfo = new ArrayList<>();
		Stage stage = stageDAO.getStage(stageNum);
		int beat = stageDAO.getBeat(stage.getMusicName());
		
		stageInfo.add(stage);
		stageInfo.add(beat);
		
		return stageInfo;
	}
	
	
}
