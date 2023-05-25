package com.kw.game.service;

import com.kw.game.dto.*;
import com.kw.game.storage.RoomStorage;
import com.kw.service.ProblemService;
import com.kw.service.UserService;
import com.kw.service.WordService;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.*;

public class WordGameService implements GameService{
    private ProblemService problemService;
    private UserService userService;
    private RoomStorage roomStorage;
    private SimpMessagingTemplate simpMessagingTemplate;
    private GameScenarioDto gameScenarioDto;
    private WordService wordService;
    private Map<String, Integer> user_score = new HashMap<>();
    private List<WordQuestionDto> word_list= new ArrayList<>();
    private Integer answer_cnt = 0;
    private Integer question_cnt = 0;
    private String roomName;
    public WordGameService(SimpMessagingTemplate simpMessagingTemplate, RoomDto room, ProblemService problemService, UserService userService, RoomStorage roomStorage, WordService wordService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.roomName = room.getRoomName();
        this.gameScenarioDto = room.getGameScenarioDto();
        this.problemService = problemService;
        this.userService = userService;
        this.roomStorage = roomStorage;
        this.wordService = wordService;
        for (String user : room.getUsers()) {
            user_score.put(user, 0);
        }
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
            roomStorage.getRoomByRoomName(roomName).setPlaying(false);
            System.out.println("message sended");
            simpMessagingTemplate.convertAndSend("/topic/room",result);
        }
        simpMessagingTemplate.convertAndSend("/topic/messages/" + roomName,result);
    }

    @Override
    public void sendQuestion() {
        simpMessagingTemplate.convertAndSend("/topic/messages/"+roomName,this.word_list.get(question_cnt));
    }

    @Override
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

    @Override
    public void getProblems() {
        List<String[]> words = wordService.getRandomWords(gameScenarioDto.getProblem_cnt());
        List<WordQuestionDto> list = new ArrayList<>();
        for (String[] word : words) {
            WordQuestionDto dto = new WordQuestionDto(word[0], word[1]);
            list.add(dto);
        }
        this.word_list = list;
    }
}
