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
    public ResponseEntity<?> createChat(@RequestBody ChatGptUserChoicePageRequest chatGptRequest
    ) throws Exception {
        try{
            ChatGptResponse response = chatGptService.createChat(
                    chatGptRequest.getUserChoiceRequest(),
                    chatGptRequest.getChatGptRequest(),
                    chatGptRequest.getPageDtoRequest());

            return ResponseEntity.ok(response);
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Create-Chat에서 오류 발생");
        }

    }

    @PostMapping("/finish-chat")
    public ResponseEntity<?> finishChat(@RequestBody ChatGptFinishTaleRequest chatGptRequest) {
        try {
            ChatGptResponse response = chatGptService.finishTale(chatGptRequest.getChatGptRequest(), chatGptRequest.getPageDtoRequest());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error during finishChat:", e); // 오류 로그 추가
            return ResponseEntity.badRequest().body("Error during finishChat: " + e.getMessage()); // 오류 메시지도 추가
        }
    }

}
