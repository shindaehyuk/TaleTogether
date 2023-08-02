package com.kong.authtest.chatGpt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatGptUserChoiceRequest {

    private UserChoiceRequest userChoiceRequest;
    private ChatGptRequest chatGptRequest;
}
