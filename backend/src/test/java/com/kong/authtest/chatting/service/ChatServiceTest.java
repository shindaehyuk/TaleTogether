package com.kong.authtest.chatting.service;

import com.kong.authtest.chatting.domain.ChatMessageDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
public class ChatServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ChatService chatService;

    @Test
    public void testProcessChatMessage() {
        ChatMessageDto messageDto = new ChatMessageDto();
        messageDto.setContent("Test Content");
        messageDto.setUserName("Test User");

        User mockUser = new User();
        mockUser.setName("Test User");

        when(userRepository.findUserByName(anyString())).thenReturn(mockUser);

        chatService.processChatMessage(messageDto);

        verify(userRepository, times(1)).findUserByName(anyString());
    }
}
