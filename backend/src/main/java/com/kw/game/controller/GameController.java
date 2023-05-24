package com.kw.game.controller;

import com.kw.game.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class GameController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/game/start")
    public ResponseEntity<?> startGame(HttpServletRequest request,@RequestBody HashMap<String, String> map) {
        System.out.println("starting game");
        String roomName = map.get("room_name");
        try {
            roomService.startGame(roomName);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/game/answer")
    public ResponseEntity<?> receiveAnswer(HttpServletRequest request,@RequestBody HashMap<String, String> map) {
        System.out.println("receiving answer");
        String roomName = map.get("room_name");
        String userName = map.get("user_name");
        boolean isCorrect = (map.get("isCorrect").equals("1")) ? true : false;
        try {
            roomService.gameServiceMap.get(roomName).receiveAnswer(userName, isCorrect);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
