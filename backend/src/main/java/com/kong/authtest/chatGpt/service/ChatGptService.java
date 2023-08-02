package com.kong.authtest.chatGpt.service;

import com.kong.authtest.chatGpt.dto.ChatGptRequest;
import com.kong.authtest.chatGpt.dto.ChatGptResponse;
import com.kong.authtest.chatGpt.dto.UserChoiceRequest;
import com.kong.authtest.karlo.dto.KarloRequest;
import com.kong.authtest.karlo.dto.KarloResponse;
import com.kong.authtest.karlo.service.JsonUtil;
import com.kong.authtest.karlo.service.KarloService;
import com.kong.authtest.page.service.PageService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
@Slf4j
public class ChatGptService {

    private static final String API_KEY = "Bearer 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";
    private final RestTemplate restTemplate = new RestTemplate();

    // 메시지를 저장하는 리스트
    private final List<ChatGptRequest.Messages> conversationHistory = new ArrayList<>();

    private final PageService pageService;

    private final KarloService karloService;

    public ChatGptResponse createChat(UserChoiceRequest userChoiceRequest, ChatGptRequest chatGptRequest) {

        ChatGptRequest.Messages system = new ChatGptRequest.Messages();
        system.setRole("system");
        system.setContent("You are a helpful assistant");


        ChatGptRequest.Messages user = new ChatGptRequest.Messages();
        user.setRole("user");
        user.setContent("5~8세가 읽을 동화책 " + userChoiceRequest.getBackGround() +"에서 모험을 하는 테마로 trpg 진행할건데 진행자 역할을 해줘. 플레이어는 2명이고 첫번째 플레이어의 이름은 " + userChoiceRequest.getPlayer1() + " 이고 성격은 " + userChoiceRequest.getPlayer1Character() + " 성격이야. 두번째 플레이어의 이름은 " + userChoiceRequest.getPlayer2() + " 이고 성격은 " + userChoiceRequest.getPlayer2Character() + "성격이야. 진행 방식은 내가 응답을 하면 응답에 따라 선택지를 줘서 스토리를 진행해줘.  턴제방식으로 진행하고 " + userChoiceRequest.getTurn() + " 턴에 끝내줘.  각 턴에는 최대 3가지 선택지를 주고 끝나면 다음턴으로 넘겨줘.  " + userChoiceRequest.getPlayer1() + ", " + userChoiceRequest.getPlayer2() + "순서대로 내가 선택할 수 있게 하고  턴을 진행해줘 내가 선택하기 전까지는 턴을 넘기지 마");


        conversationHistory.add(system);
        conversationHistory.add(user);

        // 받은 메시지를 히스토리에 추가
        if (chatGptRequest.getMessages().size() != 0) {
            ChatGptRequest.Messages lastMessage = chatGptRequest.getMessages().get(chatGptRequest.getMessages().size() - 1);
            System.out.println("Last message role: " + lastMessage.getRole());
            System.out.println("Last message content: " + lastMessage.getContent());
            conversationHistory.add(lastMessage);
        }


        // API에 보낼 요청 생성
        chatGptRequest.setModel("gpt-3.5-turbo");
        chatGptRequest.setMessages(conversationHistory);


        URI uri = URI.create("https://api.openai.com/v1/chat/completions");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", API_KEY);
        headers.set("Content-Type", "application/json");

        HttpEntity<ChatGptRequest> requestEntity = new HttpEntity<>(chatGptRequest, headers);
        System.out.println("왜" + chatGptRequest.getMessages().get(1).getContent());

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                uri,
                HttpMethod.POST,
                requestEntity,
                String.class);

        ChatGptResponse chatGptResponse = JsonUtil.fromJson(responseEntity.getBody(), ChatGptResponse.class);

        ChatGptRequest.Messages assistantMessage = new ChatGptRequest.Messages("assistant", chatGptResponse.getChoices().get(0).getMessage().getContent());

        conversationHistory.add(assistantMessage);


        KarloRequest karloRequest = new KarloRequest();
        karloRequest.setPrompt("high quality, painting." + "harry and james in space"); // 예시로 1번째 인덱스 사용
        karloRequest.setNegative_prompt("low quality, low contrast, draft, amateur, cut off, cropped, frame, scary");

        KarloResponse karloResponse = karloService.createImage(karloRequest);
        String generatedImage = karloResponse.getImages().get(0).getImage();


        return chatGptResponse;
    }
}
