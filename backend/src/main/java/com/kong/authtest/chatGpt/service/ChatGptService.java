package com.kong.authtest.chatGpt.service;

import com.kong.authtest.chatGpt.dto.ChatGptRequest;
import com.kong.authtest.chatGpt.dto.ChatGptResponse;
import com.kong.authtest.karlo.service.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ChatGptService {

    private static final String API_KEY = "Bearer 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";
    private final RestTemplate restTemplate = new RestTemplate();

    // 메시지를 저장하는 리스트
    private final List<ChatGptRequest.Messages> conversationHistory = new ArrayList<>();

    public ChatGptResponse createChat(ChatGptRequest chatGptRequest) {

        // 받은 메시지를 히스토리에 추가
        if (chatGptRequest.getMessages().size() != 0) {
            conversationHistory.add(chatGptRequest.getMessages().get(chatGptRequest.getMessages().size() - 1));
        }

        // API에 보낼 요청 생성
        ChatGptRequest request = new ChatGptRequest();
        request.setModel("gpt-3.5-turbo");
        request.setMessages(conversationHistory);

        URI uri = URI.create("https://api.openai.com/v1/chat/completions");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", API_KEY);
        headers.set("Content-Type", "application/json");

        HttpEntity<ChatGptRequest> requestEntity = new HttpEntity<>(request, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                uri,
                HttpMethod.POST,
                requestEntity,
                String.class);

        ChatGptResponse chatGptResponse = JsonUtil.fromJson(responseEntity.getBody(), ChatGptResponse.class);

        ChatGptRequest.Messages assistantMessage = new ChatGptRequest.Messages("assistant", chatGptResponse.getChoices().get(0).getMessage().getContent());
        conversationHistory.add(assistantMessage);

        return chatGptResponse;
    }
}
