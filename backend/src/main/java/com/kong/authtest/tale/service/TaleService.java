package com.kong.authtest.tale.service;

import com.kong.authtest.tale.dto.TaleDtoRequest;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@RequiredArgsConstructor
public class TaleService {

    private final TaleRepository taleRepository;
    private final UserRepository userRepository;

    //    이거 user에 id가 Long으로 바뀌면 고쳐질듯

    @Transactional
    public TaleDtoResponse register(TaleDtoRequest taleDtoRequest) {
        User user = userRepository.findUserById(taleDtoRequest.getUserId()).orElseThrow();
        return new TaleDtoResponse(taleRepository.save(new TaleDtoRequest().toTale().addUser(user)));


    }


}
