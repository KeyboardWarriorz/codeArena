package com.kw.game.controller;

import com.kw.dto.UserDTO;
import com.kw.game.dto.GameScenarioDto;
import com.kw.game.dto.RoomDto;
import com.kw.game.service.MessageService;
import com.kw.game.service.RoomService;
import com.kw.game.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class RoomController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private UserService userService;
    @PostMapping("/game/room")
    public ResponseEntity<Void> registerRoom(HttpServletRequest request,@RequestBody HashMap<String, String> map) {
        String roomName = map.get("room_name");
        GameScenarioDto gameScenarioDto;
        if (map.get("problem_category_id") == null) {
            System.out.println("if");
            gameScenarioDto = new GameScenarioDto();
        } else {
            System.out.println("else");
            Long problemCategoryId = Long.parseLong(map.get("problem_category_id"));
            Integer problem_cnt = Integer.parseInt(map.get("problem_cnt"));
            gameScenarioDto = new GameScenarioDto(problemCategoryId, 15, problem_cnt);
        }
        System.out.println("handling register room request: " + roomName);
        try {
            roomService.registerRoom(roomName, getUser(map),gameScenarioDto,Integer.parseInt(map.get("problem_category_id")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/game/room/join")
    public ResponseEntity<?> joinRoom(HttpServletRequest request,@RequestBody HashMap<String, String> map) {
        System.out.println("joining room");
        String roomName = map.get("room_name");
        RoomDto roomDto;
        try {
            roomDto = roomService.joinRoom(roomName, getUser(map));
        } catch (Exception e) {
            //방이 다 찼거나 게임이 플레이 중입니다.
            System.out.println("방이 다 참 ");
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(roomDto, HttpStatus.OK);
    }

    @GetMapping("/game/roomList")
    public Set<RoomDto> getRoomList() {
        System.out.println("fetching rooms");
        return roomService.getRoomList();
    }

    @PostMapping("/game/room/leave")
    public ResponseEntity<?> leaveRoom(HttpServletRequest request,@RequestBody HashMap<String, String> map) {
        System.out.printf("leave Room called");
        String roomName = map.get("room_name");
        String userId = map.get("user_id");
        System.out.println("userId is "+ userId);
        try {
            roomService.leaveRoom(roomName, userId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    public UserDTO getUser(HashMap<String, String> map) {
        String userId = map.get("user_id");
        String nickname = map.get("nickname");
        String profile_image = map.get("profile_image");
        int point = Integer.parseInt(map.get("point"));
        String tier = map.get("tier");
        return new UserDTO(userId, nickname, point, profile_image, tier);
    }
}
