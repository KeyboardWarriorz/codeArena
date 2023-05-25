package com.kw.game.service;
import com.kw.service.UserService;
import com.kw.game.dto.GameScenarioDto;
import com.kw.game.dto.RoomDto;
import com.kw.game.storage.RoomStorage;
import com.kw.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomService {
    @Autowired
    private RoomStorage roomStorage;
    @Autowired
    private MessageService messageService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ProblemService problemService;
    @Autowired
    private UserService userService;
    public Map<String, GameService> gameServiceMap=new HashMap<>();
    public void registerRoom(String roomName, String userId, GameScenarioDto gameScenarioDto) throws Exception{
        roomStorage.addRoom(roomName, userId,gameScenarioDto);
        roomStorage.getRoomByRoomName(roomName).users.add(userId);
        System.out.println("addRoom ended");
    }
    public void startGame(String roomName) {
        System.out.println("game started");
        roomStorage.getRoomByRoomName(roomName).setPlaying(true);
        System.out.println(roomStorage.getRoomByRoomName(roomName).isPlaying());
        simpMessagingTemplate.convertAndSend("/topic/room","started");
        gameServiceMap.put(roomName,new TimeLimitGameService(simpMessagingTemplate,roomStorage.getRoomByRoomName(roomName), problemService, userService, this.roomStorage));
    }
    public Map<String, Object> joinRoom(String roomName, String userId) throws Exception{
        Map<String, Object> dataMap = new HashMap<>();
        roomStorage.addUserToRoom(roomName, userId);
        RoomDto room = roomStorage.getRoomByRoomName(roomName);
        dataMap.put("category_id", room.getCategory_id());
        List<String> userList = new ArrayList<>();
        for (String user : room.getUsers()) {
            userList.add(user);
        }
        dataMap.put("userList", userList);
        simpMessagingTemplate.convertAndSend("/topic/room","joined");
        return dataMap;
    }
    public Set<RoomDto> getRoomList() {
        return roomStorage.getRooms();
    }
    public void leaveRoom(String roomName, String userId) throws Exception{
        System.out.println("roomservice leaveRoom");
        RoomDto room = roomStorage.getRoomByRoomName(roomName);
        room.getUsers().remove(userId);
        if (room.getUsers().size() == 0) {
            roomStorage.removeRoom(roomName);
            gameServiceMap.remove(roomName);
        }
    }
}
