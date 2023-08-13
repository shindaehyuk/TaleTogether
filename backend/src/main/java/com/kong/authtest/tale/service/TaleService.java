package com.kong.authtest.tale.service;

import com.kong.authtest.tale.dto.TaleDtoGetResponse;
import com.kong.authtest.tale.dto.TaleDtoRequest;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import com.kong.authtest.taleUser.domain.UserTale;
import com.kong.authtest.taleUser.dto.UserTaleResponse;
import com.kong.authtest.taleUser.repository.UserTaleRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaleService {

    private final TaleRepository taleRepository;
    private final UserRepository userRepository;
    private final UserTaleRepository userTaleRepository;

    @Transactional
    public TaleDtoResponse register(TaleDtoRequest taleDtoRequest) {
        return new TaleDtoResponse(taleRepository.save(taleDtoRequest.toTale()));
    }

    public TaleDtoGetResponse getTaleInfo(Long taleId) {
        return new TaleDtoGetResponse(taleRepository.findById(taleId).orElseThrow(
                () -> new IllegalArgumentException("not found")));
    }


    @Transactional
    public void delete(Long taleId) {
        taleRepository.deleteById(taleId);
    }

    public List<TaleDtoGetResponse> getAllTaleByUserId(String userId) {
        // 주어진 userId로 User 엔터티 찾기
        User user = userRepository.findUserByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("해당 사용자를 찾을 수 없습니다."));

        // 해당 사용자와 연결된 모든 UserTale 엔터티를 가져옴
        List<UserTale> userTales = userTaleRepository.findUserTalesByUser(user);

        // UserTale에서 Tale 리스트로 변환 후, 각 Tale을 TaleDtoResponse로 매핑
        return userTales.stream()
                .map(ut -> new TaleDtoGetResponse(ut.getTale()))
                .collect(Collectors.toList());
    }

}
