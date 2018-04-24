package com.beatoven.rhythmical.controller;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.beatoven.rhythmical.dao.StageDAO;
import com.beatoven.rhythmical.vo.Monster;
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
	public String receiveMotion(String request,String motion, String code) {
		motionBox = motion;
		System.out.println(code);
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
	public ArrayList<Object> getStage(String stageNum) {
		
/*		//phaser로 보내줄 stage정보를 담을 arraylist
		ArrayList<Object> stageInfo = new ArrayList<>();
		//phaser로 보내줄 monsterlist를 담을 arraylist
		ArrayList<Object> monsterlist = new ArrayList<>();
		//moster
		ArrayList<Monster> monsterTable = stageDAO.getMonsterTable();

		//DB : stage 정보를 받아온다.
		Stage stage = stageDAO.getStage(stageNum);
		//DB : music beat정보를 받아온다.
		int beat = stageDAO.getBeat(stage.getMusicName());
		
		
		String monsterlistStream = stage.getMonsterList();
		String monsterlistSplit[] = monsterlistStream.split("/");
		
		for (String monsterUnit : monsterlistSplit) {
			
			int attackline = Integer.parseInt(monsterUnit.substring(0, 0));
			int monsterNum = Integer.parseInt(monsterUnit.substring(1, 2));
			String appearanceBeat = monsterUnit.substring(3, 5);
			
			for (Monster m : monsterTable) {
				if (m.getMonsterNum() == monsterNum) {
					m.setAppearanceBeat(appearanceBeat);
					m.setAttackline(attackline);
					monsterlist.add(m);
				}
			}
			
		}*/
		
		//for Test
		ArrayList<Object> stageInfo = new ArrayList<>();
		int beat = 30;
		ArrayList<Monster> monsterlist = new ArrayList<>();
		ArrayList<Monster> monsterlistA = new ArrayList<>();
		ArrayList<Monster> monsterlistB = new ArrayList<>();
		ArrayList<Monster> monsterlistC = new ArrayList<>();
		
		//monsterNum, monsterName, speed, health, effectSoundName, skill, appearanceBeat, attackline
		Monster monster1 = new Monster(0, "mummy", 1, 5, null, null, 1, 0);
		Monster monster2 = new Monster(0, "mummy", 1, 5, null, null, 1, 0);
		Monster monster3 = new Monster(0, "mummy", 1, 3, null, null, 2, 1);
		Monster monster4 = new Monster(0, "mummy", 1, 5, null, null, 2, 2);
		Monster monster5 = new Monster(0, "mummy", 1, 5, null, null, 3, 2);
		
		monsterlist.add(monster1);
		monsterlist.add(monster2);
		monsterlist.add(monster3);
		monsterlist.add(monster4);
		monsterlist.add(monster5);
		
		for (int i = 0; i < monsterlist.size(); i++) {
			if (monsterlist.get(i).getAttackline() == 0) {
				monsterlistA.add(monsterlist.get(i));
			} else if (monsterlist.get(i).getAttackline() == 1) {
				monsterlistB.add(monsterlist.get(i));
			} else if (monsterlist.get(i).getAttackline() == 2) {
				monsterlistC.add(monsterlist.get(i));
			}
		}
		
		Stage stage = new Stage(1, "55bpm_Mirror_Mirror.mp3", null, "stageBG_1.png");
		stageInfo.add(stage);
		stageInfo.add(beat);
		stageInfo.add(monsterlistA);
		stageInfo.add(monsterlistB);
		stageInfo.add(monsterlistC);
		
		return stageInfo;
	}
	
	
}
