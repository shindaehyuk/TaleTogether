package com.kong.authtest.gameRoom.dto;

import com.kong.authtest.gameRoom.domain.GameRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameRoomRequest {

    private String sessionId;
    public GameRoom ToGameRoom() {
        return GameRoom.builder()
                .sessionId(this.sessionId)
                .timestamp(LocalDateTime.now())
                .build();
    }


}
