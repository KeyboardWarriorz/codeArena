package com.kw.game.storage;

import com.kw.dto.UserDTO;
import com.kw.game.dto.GameScenarioDto;
import com.kw.game.dto.RoomDto;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
@Component
public class RoomStorage {
    public Map<String, RoomDto> rooms = new HashMap<>();
    public Set<RoomDto> getRooms() {
        Set<RoomDto> temp = new HashSet<>();
        for (RoomDto room : rooms.values()) {
            System.out.println(room);
            temp.add(room);
        }
        return temp;
    }

    public RoomDto getRoomByRoomName(String roomName) {
        return rooms.get(roomName);
    }
    public void addUserToRoom(String roomName, UserDTO userDTO) throws Exception{
        RoomDto room = rooms.get(roomName);
        System.out.println("joining room isplaying is"+room.isPlaying());
        if (room.isPlaying()||room.getUsers().size() >= room.getCapacity()) {
            throw new Exception("Room is full!");
        }
        System.out.println("room isplay == true : " + (room.isPlaying()==true));
        rooms.get(roomName).getUsers().add(userDTO);
    }

    public void addRoom(String roomName, String userId, GameScenarioDto gameScenarioDto) throws Exception {
        if (rooms.containsKey(roomName)) {
            throw new Exception("Room already exists with roomName: " + roomName);
        }
        rooms.put(roomName,new RoomDto(roomName,1,new HashSet<>(),userId,4, gameScenarioDto,false)); //수정되어야 함
        System.out.println("room "+roomName+" included");
    }

    public void leaveRoom(String roomName, String userId) {
        for (UserDTO userDTO : rooms.get(roomName).getUsers()) {
            if (userDTO.getUserId().equals(userId)) {
                rooms.get(roomName).getUsers().remove(userDTO);
            }
        }
    }
    public void removeRoom(String roomName) throws Exception {
        if (rooms.containsKey(roomName)) {
            rooms.remove(roomName);
        }
        else{
            throw new Exception("Room does not exists");
        }
    }
}
