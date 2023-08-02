package com.kong.authtest.chatGpt.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatGptRequest {

    private String model;

    private List<Messages> messages = new ArrayList<>();



    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Messages {

        private String role;

        private String content;

    }
}
