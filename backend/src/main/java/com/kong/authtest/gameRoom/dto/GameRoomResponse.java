package com.kong.authtest.gameRoom.dto;

import com.kong.authtest.gameRoom.domain.GameRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GameRoomResponse {

    private String sessionId;

    private LocalDateTime timeStamp;

    public GameRoomResponse (GameRoom gameRoom) {
        this.sessionId = gameRoom.getSessionId();
        this.timeStamp = gameRoom.getTimestamp();
    }
}
