package com.kong.authtest.chatGpt.dto;

import com.kong.authtest.page.dto.PageDtoRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatGptUserChoicePageRequest {

    private UserChoiceRequest userChoiceRequest;
    private ChatGptRequest chatGptRequest;
    private PageDtoRequest pageDtoRequest;
}
