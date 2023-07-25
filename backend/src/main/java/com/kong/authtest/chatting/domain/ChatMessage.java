package com.kong.authtest.chatting.domain;

import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    private String content;
    private User sender;
}
