package com.kw.game.storage;

import com.kw.game.dto.MessageDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Component
public class MessageStorage {
    private Map<String, List<MessageDto>> messages=new HashMap<>();

    public List<MessageDto> getMessages(String roomName) {
        return messages.get(roomName);
    }

    public void addMessages(MessageDto messageModel, String roomName){
        if (messages.containsKey(roomName)) {
            messages.get(roomName).add(messageModel);
        }
        else{
            List<MessageDto> temp = new ArrayList<>();
            temp.add(messageModel);
            messages.put(roomName,temp);
        }
    }
}