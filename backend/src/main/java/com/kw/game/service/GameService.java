package com.kw.game.service;

import com.kw.dto.ProblemDTO;
import com.kw.game.dto.QuestionDto;
import com.kw.game.dto.ResultDto;
import com.kw.game.dto.RoomDto;
import com.kw.game.storage.RoomStorage;
import com.kw.service.ProblemService;
import com.kw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.*;

public interface GameService {
    RoomStorage roomStorage= null;
    MessageService messageService = null;
    SimpMessagingTemplate simpMessagingTemplate = null;
    ProblemService problemService = null;
    UserService userService = null;
    public Map<String, GameService> gameServiceMap=new HashMap<>();
    public void sendResult(String messageType);
    public void sendQuestion();
    public void receiveAnswer(String userId, boolean isCorrect);
    public void getProblems();
}
