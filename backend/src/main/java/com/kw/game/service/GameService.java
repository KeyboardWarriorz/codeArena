package com.kw.game.service;

import com.kw.game.dto.QuestionDto;
import com.kw.game.dto.ResultDto;
import com.kw.game.dto.RoomDto;
import com.kw.game.scenario.GameScenario;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.*;

public class GameService {
    private SimpMessagingTemplate simpMessagingTemplate;
    private GameScenario gameScenario;
    private Map<String, Integer> user_score = new HashMap<>();
    private List<QuestionDto> question_list= new ArrayList<>();
    private Integer answer_cnt = 0;
    private Integer question_cnt = 0;
    private String roomName;
    private Integer user_cnt=0;
    public GameService(SimpMessagingTemplate simpMessagingTemplate, RoomDto room) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.roomName = room.getRoomName();
        for (String user : room.getUsers()) {
            user_score.put(user, 0);
        }
        user_cnt = room.getUsers().size();
        getProblems();
        setScenario(new GameScenario(1,4,10,4));
        sendQuestion();
    }
    public void setScenario(GameScenario gameScenario) {
        this.gameScenario = gameScenario;
    }

    public void sendResult(String messageType) {
        List<String> user = new ArrayList<>();
        List<Integer> score = new ArrayList<>();
        List<String> winner = new ArrayList<>();
        Integer cur_max = 0;
        for (Map.Entry<String, Integer> entry : user_score.entrySet()) {
            String userId = entry.getKey();
            Integer userScore = entry.getValue();
            if (cur_max < userScore) {
                winner = new ArrayList<>(Arrays.asList(userId));
                cur_max = userScore;
            }
            else if (cur_max == userScore) {
                winner.add(userId);
            }
            user.add(userId);
            score.add(userScore);
        }
        ResultDto result = new ResultDto(messageType, "", winner, user, score);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + roomName,result);
    }
    public void sendQuestion() {
        simpMessagingTemplate.convertAndSend("/topic/messages/" + roomName,this.question_list.get(question_cnt));
    }
    public synchronized void receiveAnswer(String userId, boolean isCorrect) {
        this.answer_cnt += 1;
        System.out.println(isCorrect);
        if (isCorrect) {
            user_score.put(userId, user_score.get(userId) + 10);
            System.out.println(user_score.get(userId));
        }
        if (answer_cnt == user_cnt) {  //변경 해야 함
            this.answer_cnt=0;
            this.question_cnt+=1;
            sendResult("result");
            if (question_cnt == gameScenario.getProblem_cnt()-1) {
                //종료
                System.out.println("game over");
                sendResult("end");
                return;
            }
            sendQuestion();
        }

    }
    public void getProblems() {
        //게임 시나리오의 카테고리 아이디를 통해서 랜덤한 몇 개의 문제리스트를 가져온다.
        this.question_list.add(new QuestionDto("question","테스트1",new ArrayList<>(List.of("1","2","3","4")),1));
        this.question_list.add(new QuestionDto("question","테스트2",new ArrayList<>(List.of("1","2","3","4")),2));
        this.question_list.add(new QuestionDto("question","테스트3",new ArrayList<>(List.of("1","2","3","4")),3));
    }


}

