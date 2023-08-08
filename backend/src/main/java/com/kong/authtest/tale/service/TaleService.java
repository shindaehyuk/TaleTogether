package com.kong.authtest.tale.service;

import com.kong.authtest.tale.dto.TaleDtoGetResponse;
import com.kong.authtest.tale.dto.TaleDtoRequest;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaleService {

    private final TaleRepository taleRepository;
    private final UserRepository userRepository;

    @Transactional
    public TaleDtoResponse register(TaleDtoRequest taleDtoRequest) {
        User user = userRepository.findUserByUserId(taleDtoRequest.getUserId()).orElseThrow();
        return new TaleDtoResponse(taleRepository.save(taleDtoRequest.toTale().addUser(user)));
    }

    public TaleDtoGetResponse getTaleInfo(Long taleId) {
        return new TaleDtoGetResponse(taleRepository.findById(taleId).orElseThrow(() -> new IllegalArgumentException("not found")));
    }


    @Transactional
    public void delete(Long taleId) {
        taleRepository.deleteById(taleId);
    }

    public List<TaleDtoGetResponse> getAllTale(String userId){
        return taleRepository.findAllByUser(
                userRepository
                        .findUserByUserId(userId).get())
                .stream()
                .map(TaleDtoGetResponse::new)
                .collect(Collectors.toList());
    }
}
