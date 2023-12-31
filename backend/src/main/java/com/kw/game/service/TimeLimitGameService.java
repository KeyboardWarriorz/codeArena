package com.kw.game.service;
import com.kw.dto.UserDTO;
import com.kw.game.dto.*;
import com.kw.game.storage.RoomStorage;
import com.kw.service.UserService;
import com.kw.dto.ProblemDTO;
import com.kw.service.ProblemService;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.*;

public class TimeLimitGameService implements GameService{
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
    public TimeLimitGameService(SimpMessagingTemplate simpMessagingTemplate, RoomDto room,ProblemService problemService, UserService userService, RoomStorage roomStorage) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.roomName = room.getRoomName();
        this.gameScenarioDto = room.getGameScenarioDto();
        this.problemService = problemService;
        this.userService = userService;
        this.roomStorage = roomStorage;
        for (UserDTO user : room.getUsers()) {
            user_score.put(user.getNickname(), 0);
        }
        simpMessagingTemplate.convertAndSend("/topic/room",new MessageDto());
        getProblems();
        sendQuestion();
    }
    @Override
    public void sendResult(String messageType) {
        List<String> user = new ArrayList<>();
        List<Integer> score = new ArrayList<>();
        List<String> winner = new ArrayList<>();
        Integer cur_max = 0;
        for (Map.Entry<String, Integer> entry : user_score.entrySet()) {
            String nickname = entry.getKey();
            Integer userScore = entry.getValue();
            if (cur_max < userScore) {
                winner = new ArrayList<>(Arrays.asList(nickname));
                cur_max = userScore;
            }
            else if (cur_max == userScore) {
                winner.add(nickname);
            }
            user.add(nickname);
            score.add(userScore);
        }
        ResultDto result = new ResultDto(messageType, "", winner, user, score);
        if (messageType.equals("end")) {
            for (String win_user : winner) {
                userService.addUserPointByNickname(win_user, 100);
            }
            roomStorage.getRoomByRoomName(roomName).setPlaying(false);
            System.out.println("message sended");
            simpMessagingTemplate.convertAndSend("/topic/room",result);
        }
        simpMessagingTemplate.convertAndSend("/topic/messages/" + roomName,result);
    }
    @Override
    public void sendQuestion() {
        simpMessagingTemplate.convertAndSend("/topic/messages/" + roomName,this.question_list.get(question_cnt));
    }
    @Override
    public synchronized void receiveAnswer(String nickname, boolean isCorrect) {
        this.answer_cnt += 1;
        System.out.println(isCorrect);
        if (isCorrect) {
            user_score.put(nickname, user_score.get(nickname) + 10);
            System.out.println(user_score.get(nickname));
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
                simpMessagingTemplate.convertAndSend("/topic/room",new MessageDto());
                return;
            }
            sendQuestion();
        }

    }

    @Override
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

