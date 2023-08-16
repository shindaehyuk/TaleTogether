package com.kong.authtest.chatGpt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChoiceRequest {
    private String backGround;
    private String player1;
    private String player2;
    private String player1Character;
    private String player2Character;
    private String turn;

}
