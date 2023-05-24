package com.kw.game.service;
import com.kw.game.storage.RoomStorage;
import com.kw.service.UserService;
import com.kw.dto.ProblemDTO;
import com.kw.game.dto.QuestionDto;
import com.kw.game.dto.ResultDto;
import com.kw.game.dto.RoomDto;
import com.kw.game.dto.GameScenarioDto;
import com.kw.service.ProblemService;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.*;

public class GameService {
    private ProblemService problemService;
    private UserService userService;
    private RoomStorage roomStorage;
    private SimpMessagingTemplate simpMessagingTemplate;
    private GameScenarioDto gameScenarioDto;
    private Map<String, Integer> user_score = new HashMap<>();
    private List<QuestionDto> question_list= new ArrayList<>();
    private Integer answer_cnt = 0;
    private Integer question_cnt = 0;
    private String roomName;
    private Integer user_cnt=0;
    public GameService(SimpMessagingTemplate simpMessagingTemplate, RoomDto room,ProblemService problemService, UserService userService, RoomStorage roomStorage) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.roomName = room.getRoomName();
        this.gameScenarioDto = room.getGameScenarioDto();
        this.problemService = problemService;
        this.userService = userService;
        this.roomStorage = roomStorage;
        for (String user : room.getUsers()) {
            user_score.put(user, 0);
        }
        user_cnt = room.getUsers().size();
        getProblems();
        sendQuestion();
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
        if (messageType.equals("end")) {
            for (String win_user : winner) {
                userService.addUserPoint(win_user, 100);
            }
        }
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
        if (answer_cnt == roomStorage.getRoomByRoomName(roomName).getUsers().size()) {
            this.answer_cnt=0;
            this.question_cnt+=1;
            sendResult("result");
            if (question_cnt == gameScenarioDto.getProblem_cnt()) {
                //종료
                //db에 포인트 추가하게 하기

                System.out.println("game over");
                sendResult("end");
                return;
            }
            sendQuestion();
        }

    }

    /**
     * 게임 시나리오의 카테고리 아이디를 통해서 랜덤한 몇 개의 문제리스트를 가져온다.(미완성)
     */
    public void getProblems() {
        List<ProblemDTO> list = problemService.select_random_problem(gameScenarioDto.getProblemCategoryId(), gameScenarioDto.getProblem_cnt());
        for (ProblemDTO problemDTO : list) {
            String question = problemDTO.getQuestion();
            List<String> answer_list = new ArrayList<>();
            answer_list.add(problemDTO.getAnswer1());
            answer_list.add(problemDTO.getAnswer2());
            answer_list.add(problemDTO.getAnswer3());
            answer_list.add(problemDTO.getAnswer4());
            Integer answer_index = problemDTO.getAnswerIndex();
            String description = problemDTO.getSolution();
            question_list.add(new QuestionDto("question", question, answer_list, answer_index,description));
        }
    }


}

