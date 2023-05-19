package com.kw.game.service;

import com.kw.game.dto.MessageDto;
import com.kw.game.storage.MessageStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageStorage messageStorage;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void sendMessage(MessageDto message, String roomName) {
        System.out.println(messageStorage);
        System.out.println("service send message");
        simpMessagingTemplate.convertAndSend("/topic/messages/" + roomName, message);
    }

    public List<MessageDto> getMessages(String roomName) {
        return messageStorage.getMessages(roomName);
    }

    public void sendBroadcast(MessageDto message) {
        simpMessagingTemplate.convertAndSend("/topic/room" , message);
    }

}
