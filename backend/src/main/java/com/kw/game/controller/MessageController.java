package com.kw.game.controller;

import com.kw.game.dto.MessageDto;
import com.kw.game.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @MessageMapping("/chat/{roomName}")
    public void sendMessage(@DestinationVariable String roomName, MessageDto message) {
        System.out.println("handling send message: " + message + " to: " + roomName);
        messageService.sendMessage(message, roomName);
    }
    @MessageMapping("/room")
    public void sendBroadcast(MessageDto message) {
        System.out.println("handling login broadcast message: " + message );
        messageService.sendBroadcast(message);
    }

    @GetMapping("/chat/{roomName}")
    public List<MessageDto> getChats(@PathVariable String roomName){
        return messageService.getMessages(roomName);
    }
}
