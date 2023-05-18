package com.kw.game.storage;

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
    public void addUserToRoom(String roomName, String userName) throws Exception{
        RoomDto room = rooms.get(roomName);
        if (room.getUsers().size() >= room.getCapacity()) {
            throw new Exception("Room is full!");
        }
        rooms.get(roomName).getUsers().add(userName);
    }

    public void addRoom(String roomName, GameScenarioDto gameScenarioDto) throws Exception {
        if (rooms.containsKey(roomName)) {
            throw new Exception("Room already exists with roomName: " + roomName);
        }
        rooms.put(roomName,new RoomDto(roomName,1,new HashSet<>(),4, gameScenarioDto)); //수정되어야 함
        System.out.println("room "+roomName+" included");
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
