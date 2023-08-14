package com.kong.authtest.chatGpt.controller;


import com.kong.authtest.chatGpt.dto.ChatGptFinishTaleRequest;
import com.kong.authtest.chatGpt.dto.ChatGptResponse;
import com.kong.authtest.chatGpt.dto.ChatGptUserChoicePageRequest;
import com.kong.authtest.chatGpt.service.ChatGptService;
import com.kong.authtest.comment.dto.CommentDtoResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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
    @ApiOperation(value = "image 생성 및 page 저장하는 API", notes = "chatGpt와 통신하는 API, 결과가 바로 page DB에 저장된다.", response = ChatGptResponse.class)
    public ResponseEntity<ChatGptResponse> createChat(@RequestBody ChatGptUserChoicePageRequest chatGptRequest
    ) throws Exception {
        ChatGptResponse response = chatGptService.createChat(
                chatGptRequest.getUserChoiceRequest(),
                chatGptRequest.getChatGptRequest(),
                chatGptRequest.getPageDtoRequest());

        return ResponseEntity.ok(response);


    }

    @PostMapping("/finish-chat")
    public ResponseEntity<ChatGptResponse> finishChat(@RequestBody ChatGptFinishTaleRequest chatGptRequest) throws Exception {
        ChatGptResponse response = chatGptService.finishTale(chatGptRequest.getChatGptRequest(), chatGptRequest.getPageDtoRequest());
        return ResponseEntity.ok(response);

    }

}
