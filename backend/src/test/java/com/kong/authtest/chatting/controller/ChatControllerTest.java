package com.kong.authtest.chatting.controller;

import com.kong.authtest.chatting.domain.ChatMessageDto;
import com.kong.authtest.chatting.service.ChatService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.context.ActiveProfiles;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
public class ChatControllerTest {

    @MockBean
    private ChatService chatService;

    @Autowired
    @InjectMocks
    private ChatController chatController;

    @Test
    public void testSend() {
        ChatMessageDto messageDto = new ChatMessageDto();
        messageDto.setContent("Test Content");
        messageDto.setUserName("Test User");

        chatController.send(messageDto);

        verify(chatService, times(1)).processChatMessage(any(ChatMessageDto.class));
    }
}
