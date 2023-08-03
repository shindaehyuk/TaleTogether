package com.kong.authtest.chatGpt.controller;


import com.kong.authtest.chatGpt.dto.ChatGptResponse;
import com.kong.authtest.chatGpt.dto.ChatGptUserChoicePageRequest;
import com.kong.authtest.chatGpt.service.ChatGptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class ChatGptController {

    private final ChatGptService chatGptService;

    @PostMapping("/create-chat")
    public ResponseEntity<ChatGptResponse> createChat(@RequestBody ChatGptUserChoicePageRequest chatGptRequest
                                                      ) throws Exception {

        ChatGptResponse response = chatGptService.createChat(
                chatGptRequest.getUserChoiceRequest(),
                chatGptRequest.getChatGptRequest(),
                chatGptRequest.getPageDtoRequest());

        return ResponseEntity.ok(response);
    }

}
