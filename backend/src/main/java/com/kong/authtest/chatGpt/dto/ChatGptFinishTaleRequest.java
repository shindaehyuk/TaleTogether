package com.kong.authtest.chatGpt.dto;

import com.kong.authtest.finalScriptPage.dto.FinalScriptPageRequest;
import com.kong.authtest.page.dto.PageDtoRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatGptFinishTaleRequest {

    private ChatGptRequest chatGptRequest;
    private FinalScriptPageRequest pageDtoRequest;

}
