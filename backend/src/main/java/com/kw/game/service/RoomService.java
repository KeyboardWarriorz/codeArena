package com.kw.game.service;
import com.kw.dto.UserDTO;
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
    public void registerRoom(String roomName, UserDTO userDto, GameScenarioDto gameScenarioDto) throws Exception{
        roomStorage.addRoom(roomName, userDto.getUserId(),gameScenarioDto);
        roomStorage.getRoomByRoomName(roomName).users.add(userDto);
        System.out.println("addRoom ended");
    }
    public void startGame(String roomName) {
        System.out.println("game started");
        roomStorage.getRoomByRoomName(roomName).setPlaying(true);
        System.out.println(roomStorage.getRoomByRoomName(roomName).isPlaying());
        simpMessagingTemplate.convertAndSend("/topic/room","started");
        gameServiceMap.put(roomName,new TimeLimitGameService(simpMessagingTemplate,roomStorage.getRoomByRoomName(roomName), problemService, userService, this.roomStorage));
    }
    public RoomDto joinRoom(String roomName, UserDTO userDTO) throws Exception{
        roomStorage.addUserToRoom(roomName, userDTO);
        RoomDto room = roomStorage.getRoomByRoomName(roomName);
        simpMessagingTemplate.convertAndSend("/topic/room",roomStorage.getRoomByRoomName(roomName));
        simpMessagingTemplate.convertAndSend("/topic/messages/"+roomName,roomStorage.getRoomByRoomName(roomName));
        return room;
    }
    public Set<RoomDto> getRoomList() {
        return roomStorage.getRooms();
    }
    public void leaveRoom(String roomName, String userId) throws Exception{
        System.out.println("roomservice leaveRoom");
        RoomDto room = roomStorage.getRoomByRoomName(roomName);
        roomStorage.leaveRoom(roomName,userId);
        if (room.getUsers().size() == 0) {
            roomStorage.removeRoom(roomName);
            gameServiceMap.remove(roomName);
        }
        room = roomStorage.getRoomByRoomName(roomName);
        System.out.println("room dto = " + room);
        if (room != null) {
            simpMessagingTemplate.convertAndSend("/topic/messages/" + roomName, room);
        }

    }
}
