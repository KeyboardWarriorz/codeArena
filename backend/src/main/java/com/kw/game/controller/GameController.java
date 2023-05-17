package com.kw.game.controller;

import com.kw.game.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class GameController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/game/start")
    public ResponseEntity<?> startGame(HttpServletRequest request) {
        System.out.println("starting game");
        String roomName = request.getParameter("room_name");
        try {
            roomService.startGame(roomName);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/game/answer")
    public ResponseEntity<?> receiveAnswer(HttpServletRequest request) {
        System.out.println("receiving answer");
        String roomName = request.getParameter("room_name");
        String userName = request.getParameter("user_name");
        boolean isCorrect = (request.getParameter("isCorrect").equals("1")) ? true : false;
        try {
            roomService.gameServiceMap.get(roomName).receiveAnswer(userName, isCorrect);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
