package com.kong.authtest.gameRoom.domain;

import com.kong.authtest.tale.model.Tale;
import jdk.jfr.Timestamp;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GameRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Tale tale;

    private String sessionId;

    private LocalDateTime timestamp;

}
