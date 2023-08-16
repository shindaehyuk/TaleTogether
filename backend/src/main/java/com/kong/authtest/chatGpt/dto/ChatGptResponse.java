package com.kong.authtest.chatGpt.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatGptResponse {

    private String id;
    private String object;
    private long created;
    private List<Choice> choices;
    private Usage usage;
    private Long pageId;
    private String image;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Choice {
        private int index;
        private Message message;
        private String finish_reason;

    }


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Message {
        private String role;
        private String content;

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Usage {
        private int prompt_tokens;
        private int completion_tokens;
        private int total_tokens;

    }
}


