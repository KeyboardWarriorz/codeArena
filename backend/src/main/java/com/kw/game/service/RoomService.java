package com.kw.game.service;
import com.kw.game.dto.RoomDto;
import com.kw.game.storage.RoomStorage;
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
    public Map<String, GameService> gameServiceMap=new HashMap<>();
    public void registerRoom(String roomName, String userId) throws Exception{
        roomStorage.addRoom(roomName);
        roomStorage.getRoomByRoomName(roomName).users.add(userId);
        System.out.println("addRoom ended");
    }
    public void startGame(String roomName) {
        gameServiceMap.put(roomName,new GameService(simpMessagingTemplate,roomStorage.getRoomByRoomName(roomName)));
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
        dataMap.put("chatList", messageService.getMessages(roomName));
        return dataMap;
    }
    public Set<RoomDto> getRoomList() {
        return roomStorage.getRooms();
    }
    public void leaveRoom(String roomName, String userId) throws Exception{
        RoomDto room = roomStorage.getRoomByRoomName(roomName);
        room.getUsers().remove(userId);
        if (room.getUsers().size() == 0) {
            roomStorage.removeRoom(roomName);
            gameServiceMap.remove(roomName);
        }
    }
}
