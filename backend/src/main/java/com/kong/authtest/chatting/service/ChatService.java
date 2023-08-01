package com.kong.authtest.chatting.service;

import com.kong.authtest.chatting.domain.ChatMessage;
import com.kong.authtest.chatting.domain.ChatMessageDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final UserRepository userRepository;

    public ChatMessage processChatMessage(ChatMessageDto messageDto) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setContent(messageDto.getContent());

        User user = userRepository.findUserByName(messageDto.getUserName()).orElseThrow();
        chatMessage.setSender(user);

        return chatMessage;  // 실제로 데이터베이스에 저장하려면 저장 로직도 추가되어야 합니다.
    }
}
