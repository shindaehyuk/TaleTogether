package com.kong.authtest.gameRoom.dto;

import com.kong.authtest.gameRoom.domain.GameRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameRoomDeleteResponse {

    public String message;

    public GameRoomDeleteResponse(String msg){
        this.message = msg;
    }

}
