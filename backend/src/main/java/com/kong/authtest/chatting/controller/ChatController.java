package com.kong.authtest.chatting.controller;

import com.kong.authtest.chatting.domain.ChatMessage;
import com.kong.authtest.chatting.domain.ChatMessageDto;
import com.kong.authtest.chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessageDto messageDto) {
        return chatService.processChatMessage(messageDto);
    }
}
