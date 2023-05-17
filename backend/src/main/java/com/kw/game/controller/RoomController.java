package com.kw.game.controller;

import com.kw.game.dto.RoomDto;
import com.kw.game.service.MessageService;
import com.kw.game.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Set;

@RestController
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class RoomController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private RoomService roomService;
    @PostMapping("/game/room")
    public ResponseEntity<Void> registerRoom(HttpServletRequest request) {
        String roomName = request.getParameter("room_name");
        String userId = request.getParameter("user_id");
        System.out.println("handling register room request: " + roomName);
        try {
            roomService.registerRoom(roomName, userId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/game/room/join")
    public ResponseEntity<?> joinRoom(HttpServletRequest request) {
        System.out.println("joining room");
        String roomName = request.getParameter("room_name");
        String userId = request.getParameter("user_id");
        Map<String, Object> dataMap;
        try {
            dataMap = roomService.joinRoom(roomName, userId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(dataMap, HttpStatus.OK);
    }

    @GetMapping("/game/roomList")
    public Set<RoomDto> getRoomList() {
        System.out.println("fetching rooms");
        return roomService.getRoomList();
    }

    @PostMapping("/game/room/leave")
    public ResponseEntity<?> leaveRoom(HttpServletRequest request) {
        String roomName = request.getParameter("room_name");
        String userId = request.getParameter("user_id");
        try {
            roomService.leaveRoom(roomName, userId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
