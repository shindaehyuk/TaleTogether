package com.kong.authtest.gameRoom.service;

import com.kong.authtest.chatGpt.service.ChatGptService;
import com.kong.authtest.gameRoom.domain.GameRoom;
import com.kong.authtest.gameRoom.dto.GameRoomDeleteResponse;
import com.kong.authtest.gameRoom.dto.GameRoomRequest;
import com.kong.authtest.gameRoom.dto.GameRoomResponse;
import com.kong.authtest.gameRoom.repository.GameRoomRepository;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import com.kong.authtest.taleUser.domain.UserTale;
import com.kong.authtest.taleUser.repository.UserTaleRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRoomRepository gameRoomRepository;

    private final UserRepository userRepository;

    private final TaleRepository taleRepository;

    private final UserTaleRepository userTaleRepository;

    private final ChatGptService chatGptService;


    private final static String CODE = "ssafy";

    @Transactional
    public GameRoomResponse registerGame(String userId) {
        chatGptService.clearConversationHistory();
        String code = generateCode();

        Tale tale = Tale.builder().build();
        taleRepository.save(tale);

        // 3. UserTale 엔티티 사용하여 사용자와 Tale의 관계 저장
        UserTale userTale = UserTale.builder().tale(tale)
                .user(userRepository.findUserByUserId(userId)
                        .orElseThrow(() ->
                                new NoSuchElementException("이런 회원 없습니다.")))
                .build();

        userTaleRepository.save(userTale);

        GameRoomResponse gameRoomResponse = new GameRoomResponse();
        gameRoomResponse.setSessionId(code);
        gameRoomResponse.setTimeStamp(LocalDateTime.now());

        GameRoom gameRoom = GameRoom.builder().sessionId(code).tale(tale).timestamp(LocalDateTime.now()).build();
        gameRoomRepository.save(gameRoom);

        gameRoomResponse.setTaleId(tale.getTaleId());

        return gameRoomResponse;
    }

    @Transactional
    public GameRoomResponse enterGame(String userId, String sessionId) {
        // sessionId를 사용하여 GameRoom 찾기
        GameRoom gameRoom = findGameRoomBySessionId(sessionId);

        // GameRoom과 연결된 Tale 찾기
        Tale tale = gameRoom.getTale();

        // Tale에 참여하는 새로운 사용자 추가
        User user = userRepository.findUserByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자를 찾을 수 없습니다."));
        UserTale userTale = UserTale.builder().tale(tale).user(user).build();
        userTaleRepository.save(userTale);

        return new GameRoomResponse(gameRoom);  // GameRoom 정보로 응답 생성
    }

    private GameRoom findGameRoomBySessionId(String sessionId) {
        return gameRoomRepository.findGameRoomBySessionId(sessionId).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 방"));
    }

    @Transactional
    public GameRoomDeleteResponse deleteGame(GameRoomRequest gameRoomRequest) {
        findGameRoomBySessionId(gameRoomRequest);
        gameRoomRepository.delete(gameRoomRequest.ToGameRoom());
        return new GameRoomDeleteResponse("정상적 으로 삭제됨");
    }

    private GameRoom findGameRoomBySessionId(GameRoomRequest gameRoomRequest) {
        return gameRoomRepository.findGameRoomBySessionId(gameRoomRequest.getSessionId())
                .orElseThrow(() -> new IllegalArgumentException("존재 하지 않는 게임방"));
    }

    private String generateCode() {
        Random rand = new Random();
        int randomNumber = rand.nextInt(9000) + 1000;  // generates a random number between 1000 and 9999
        return CODE + randomNumber;
    }


}
