package com.kong.authtest.share.service;

import com.kong.authtest.share.dto.ShareDtoRequest;
import com.kong.authtest.share.dto.ShareDtoResponse;
import com.kong.authtest.share.repository.ShareRepository;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShareService {

    private final ShareRepository shareRepository;
    private final UserRepository userRepository;

//    이것도 user의 id가 Long 형태로 바뀌어야 함
    public ShareDtoResponse register(ShareDtoRequest shareDtoRequest, Long id){
        return new ShareDtoResponse(shareRepository.save(shareDtoRequest.toShare()
                .addUser(userRepository.findById(id)
                        .orElseThrow(()->new IllegalArgumentException("id 실수?")))));
    }

    public ShareDtoResponse findById(Long id){
        return new ShareDtoResponse(shareRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("없네...")));
    }

}
