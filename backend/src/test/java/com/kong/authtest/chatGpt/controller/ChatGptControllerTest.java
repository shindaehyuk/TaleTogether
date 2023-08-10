package com.kong.authtest.chatGpt.controller;

import com.kong.authtest.chatGpt.dto.ChatGptResponse;
import com.kong.authtest.chatGpt.dto.ChatGptUserChoicePageRequest;
import com.kong.authtest.chatGpt.service.ChatGptService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
@WebAppConfiguration
public class ChatGptControllerTest {

    private WebSocketStompClient stompClient;

    @MockBean
    private ChatGptService chatGptService;

    private final BlockingQueue<String> blockingQueue = new LinkedBlockingDeque<>();

    @Test
    public void testCreateChatWebSocket() throws Exception {
        stompClient = new WebSocketStompClient(new SockJsClient(Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient()))));

        StompSession session = stompClient.connect("ws://localhost:8083/ws-chat", new DefaultStompFrameHandler()).get(1, TimeUnit.SECONDS);

        ChatGptUserChoicePageRequest request = new ChatGptUserChoicePageRequest();
        // TODO: 테스트 데이터로 request 객체 채우기

        ChatGptResponse mockResponse = new ChatGptResponse();
        // TODO: mockResponse 객체 채우기

        when(chatGptService.createChat(any(), any(), any())).thenReturn(mockResponse);

        session.send("/create-chat", request);

        String response = blockingQueue.poll(1, TimeUnit.SECONDS);
        assertThat(response).isNotNull();
        // TODO: 응답 내용에 대한 추가 확인
    }

    class DefaultStompFrameHandler implements StompSessionHandler {
        @Override
        public Type getPayloadType(StompHeaders headers) {
            return String.class;
        }

        @Override
        public void handleFrame(StompHeaders headers, Object payload) {
            blockingQueue.offer((String) payload);
        }

        @Override
        public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        }

        @Override
        public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
        }

        @Override
        public void handleTransportError(StompSession session, Throwable exception) {
        }
    }
}
