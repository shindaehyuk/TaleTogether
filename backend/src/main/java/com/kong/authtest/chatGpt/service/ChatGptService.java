package com.kong.authtest.chatGpt.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kong.authtest.chatGpt.dto.ChatGptRequest;
import com.kong.authtest.chatGpt.dto.ChatGptResponse;
import com.kong.authtest.chatGpt.dto.UserChoiceRequest;
import com.kong.authtest.finalScriptPage.domain.FinalScriptPage;
import com.kong.authtest.finalScriptPage.dto.FinalScriptPageRequest;
import com.kong.authtest.finalScriptPage.dto.FinalScriptPageResponse;
import com.kong.authtest.finalScriptPage.repository.FinalScriptPageRepository;
import com.kong.authtest.finalScriptPage.service.FinalScriptPageService;
import com.kong.authtest.karlo.dto.KarloRequest;
import com.kong.authtest.karlo.dto.KarloResponse;
import com.kong.authtest.karlo.service.JsonUtil;
import com.kong.authtest.karlo.service.KarloService;
import com.kong.authtest.page.dto.PageDtoRequest;
import com.kong.authtest.page.dto.PageDtoResponse;
import com.kong.authtest.page.service.PageService;
import com.kong.authtest.translation.DeepLService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatGptService {

    private static final String API_KEY = "Bearer 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";
    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper objectMapper = new ObjectMapper();


    // 메시지를 저장하는 리스트
    private final List<ChatGptRequest.Messages> conversationHistory = new ArrayList<>();

    private final PageService pageService;

    private final FinalScriptPageService finalScriptPageService;

    private final FinalScriptPageRepository finalScriptPageRepository;

    private final KarloService karloService;

    private final DeepLService deepLService;


    @Transactional
    public ChatGptResponse createChat(UserChoiceRequest userChoiceRequest, ChatGptRequest chatGptRequest, PageDtoRequest pageDtoRequest) throws Exception {

        ChatGptMessage chatGptMessage = new ChatGptMessage(SetDefaultGptSystem(), setDefaultGptUser(userChoiceRequest));

        setDefaultGptMessages(chatGptMessage);
        addGptMessageHistory(chatGptRequest);
        setDefaultGpt(chatGptRequest);

        addGptConversation(sendGptApiServer(chatGptRequest));
        KarloResponse karloResponse = karloService.createImage(setDefaultKarlo(userChoiceRequest, content()));


        PageDtoResponse pageDtoResponse = registerPage(pageDtoRequest, content(), karloResponse);


        ChatGptResponse chatGptResponse = sendGptApiServer(chatGptRequest);

        chatGptResponse.setImage(pageDtoResponse.getImage());
        chatGptResponse.setPageId(pageDtoResponse.getPageId());


        return chatGptResponse;
    }

    @Transactional
    public List<FinalScriptPageResponse> finishTale(ChatGptRequest chatGptRequest, FinalScriptPageRequest finalScriptPageRequest) throws Exception {

        ChatGptMessage chatGptMessage = new ChatGptMessage(SetDefaultGptSystem(), setDefaultFinishGptUser());
        setDefaultGptMessages(chatGptMessage);
        addGptMessageHistory(chatGptRequest);
        setDefaultGpt(chatGptRequest);

        ChatGptResponse chatGptResponse = sendGptApiServer(chatGptRequest);
        if (chatGptResponse == null || chatGptResponse.getChoices() == null || chatGptResponse.getChoices().isEmpty()) {
            throw new Exception("Gpt 서버가 이상함");
        }
        addGptConversation(chatGptResponse);

        String fullContent = chatGptResponse.getChoices().get(0).getMessage().getContent();

        int startIndex = 0;

        int sequence = 1;


        List<FinalScriptPageResponse> finalScriptPageResponses = new ArrayList<>();

        while (startIndex < fullContent.length()) {
            int tentativeEndIndex = Math.min(fullContent.length(), startIndex + 180);

            int actualEndIndex = findNidaIndex(fullContent, tentativeEndIndex);

            if (actualEndIndex <= startIndex) {
                actualEndIndex = tentativeEndIndex;
            }

            String subContent = fullContent.substring(startIndex, actualEndIndex);

            if (!subContent.isEmpty()) {
                KarloResponse karloResponse = karloService.createImage(setFinalDefaultKarlo(subContent));

                FinalScriptPageResponse finalScriptPageResponse = registerFinalScriptPage(finalScriptPageRequest, subContent, karloResponse,sequence);
                finalScriptPageResponses.add(finalScriptPageResponse);
            }

            startIndex = actualEndIndex;
            sequence++;
        }


        if (!finalScriptPageResponses.isEmpty()) {
            FinalScriptPageResponse lastPage = finalScriptPageResponses.get(finalScriptPageResponses.size() - 1);
            chatGptResponse.setImage(lastPage.getImage());
            chatGptResponse.setPageId(lastPage.getPageId());
        }

        return finalScriptPageRepository
                .findAll()
                .stream()
                .map(FinalScriptPageResponse::new)
                .collect(Collectors.toList());
    }



    public void clearConversationHistory() {
        conversationHistory.clear();
    }

    private int findNidaIndex(String content, int endIndex) {
        int nidaIndex = content.lastIndexOf("니다.", endIndex);
        return (nidaIndex == -1 || nidaIndex + 2 > endIndex) ? endIndex : nidaIndex + 2;
    }




    @NotNull
    private static ChatGptRequest.Messages setDefaultGptUser(UserChoiceRequest userChoiceRequest) {
        ChatGptRequest.Messages user = new ChatGptRequest.Messages();
        user.setRole("user");
        user.setContent("5~8세가 읽을 동화책 " + userChoiceRequest.getBackGround() + "에서 모험을 하는 테마로 trpg 진행할건데 진행자 역할을 해줘. 플레이어는 2명이고 첫번째 플레이어의 이름은 " + userChoiceRequest.getPlayer1() + " 이고 성격은 " + userChoiceRequest.getPlayer1Character() + " 성격이야. 두번째 플레이어의 이름은 " + userChoiceRequest.getPlayer2() + " 이고 성격은 " + userChoiceRequest.getPlayer2Character() + "성격이야. 진행 방식은 내가 응답을 하면 응답에 따라 선택지를 줘서 스토리를 진행해줘.  턴제방식으로 진행하고 " + userChoiceRequest.getTurn() + " 턴에 끝내줘.  각 턴에는 최대 3가지 선택지를 주고 끝나면 다음턴으로 넘겨줘.  " + userChoiceRequest.getPlayer1() + ", " + userChoiceRequest.getPlayer2() + "순서대로 내가 선택할 수 있게 하고  턴을 진행해줘 내가 선택하기 전까지는 턴을 넘기지 마.");
        return user;
    }

    @NotNull
    private static ChatGptRequest.Messages setDefaultFinishGptUser() {
        ChatGptRequest.Messages user = new ChatGptRequest.Messages();
        user.setRole("user");
        user.setContent("게임을 종료 해주고 여태 내용을 동화로 만들어 줘. 이제 선택지를 주지 않아도 돼");
        return user;
    }

    @NotNull
    private static ChatGptRequest.Messages SetDefaultGptSystem() {
        ChatGptRequest.Messages system = new ChatGptRequest.Messages();

        system.setRole("system");
        system.setContent("You are a helpful assistant and you are the host of the TRPG game");
        return system;
    }


    @NotNull
    private KarloRequest setDefaultKarlo(UserChoiceRequest userChoiceRequest, String content) throws Exception {
        KarloRequest karloRequest = new KarloRequest();
        karloRequest.setPrompt("painting." + translateGptMessage(userChoiceRequest, content)); // 예시로 1번째 인덱스 사용
        karloRequest.setNegative_prompt("low quality, low contrast, draft, amateur, cut off, cropped, frame, scary, letters, character");
        return karloRequest;
    }

    @NotNull
    private KarloRequest setFinalDefaultKarlo(String content) throws Exception {
        KarloRequest karloRequest = new KarloRequest();
        karloRequest.setPrompt("painting." + translateFinishGptMessage(content)); // 예시로 1번째 인덱스 사용
        karloRequest.setNegative_prompt("low quality, low contrast, draft, amateur, cut off, cropped, frame, scary, letters, character");
        return karloRequest;
    }


    @NotNull
    private String translateGptMessage(UserChoiceRequest userChoiceRequest, String content) throws Exception {
        String text = deepLService.translateEN(userChoiceRequest.getPlayer1() + content).trim();
        if (text.length() > 200) {
            text = text.substring(0, 200);
        }
        return text;
    }

    @NotNull
    private String translateFinishGptMessage(String content) throws Exception {
        String text = deepLService.translateEN(content).trim();
        if (text.length() > 200) {
            text = text.substring(0, 200);
        }
        return text;
    }

    private String convertToJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            log.error("Failed to convert object to JSON string", e);
            throw new RuntimeException("Failed to convert object to JSON", e);
        }
    }


    @Nullable
    private ChatGptResponse sendGptApiServer(ChatGptRequest chatGptRequest) {
        URI uri = URI.create("https://api.openai.com/v1/chat/completions");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", API_KEY);
        headers.set("Content-Type", "application/json");

        HttpEntity<ChatGptRequest> requestEntity = new HttpEntity<>(chatGptRequest, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, String.class);

        ChatGptResponse chatGptResponse = JsonUtil.fromJson(responseEntity.getBody(), ChatGptResponse.class);
        return chatGptResponse;
    }


    private static class ChatGptMessage {
        public final ChatGptRequest.Messages system;
        public final ChatGptRequest.Messages user;

        public ChatGptMessage(ChatGptRequest.Messages system, ChatGptRequest.Messages user) {
            this.system = system;
            this.user = user;
        }
    }

    private void setDefaultGpt(ChatGptRequest chatGptRequest) {
        chatGptRequest.setModel("gpt-3.5-turbo-16k");
        chatGptRequest.setMessages(conversationHistory);
    }

    private void addGptMessageHistory(ChatGptRequest chatGptRequest) {
        if (chatGptRequest.getMessages().size() != 0) {
            conversationHistory.add(chatGptRequest.getMessages().get(chatGptRequest.getMessages().size() - 1));
        }
    }

    private void setDefaultGptMessages(ChatGptMessage chatGptMessage) {
        conversationHistory.add(chatGptMessage.system);
        conversationHistory.add(chatGptMessage.user);
    }

    private void addGptConversation(ChatGptResponse chatGptResponse) {
        ChatGptRequest.Messages assistantMessage = new ChatGptRequest.Messages("assistant", chatGptResponse.getChoices().get(0).getMessage().getContent());

        conversationHistory.add(assistantMessage);
    }

    private PageDtoResponse registerPage(PageDtoRequest pageDtoRequest, String content, KarloResponse karloResponse) {
        pageDtoRequest.setImage(karloResponse.getFileName());
        pageDtoRequest.setContent(content);

        return pageService.register(pageDtoRequest);
    }

    private FinalScriptPageResponse registerFinalScriptPage(FinalScriptPageRequest finalScriptPageRequest, String content, KarloResponse karloResponse, int sequence) {
      finalScriptPageRequest.setImage(karloResponse.getFileName());
      finalScriptPageRequest.setContent(content);
      finalScriptPageRequest.setSequence(sequence);
      return finalScriptPageService.register(finalScriptPageRequest);
    }



    private String content() {
        return conversationHistory.get(conversationHistory.size() - 1).getContent();
    }
}
