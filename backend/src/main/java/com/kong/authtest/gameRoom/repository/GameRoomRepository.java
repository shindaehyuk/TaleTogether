package com.kong.authtest.gameRoom.repository;


import com.kong.authtest.gameRoom.domain.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRoomRepository extends JpaRepository<GameRoom, Long> {

    Optional<GameRoom> findGameRoomBySessionId(String sessionId);
}
