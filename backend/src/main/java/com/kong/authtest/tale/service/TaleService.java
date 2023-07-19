package com.kong.authtest.tale.service;

import com.kong.authtest.tale.dto.TaleDtoRequest;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TaleService{

    private final TaleRepository taleRepository;
    private final UserRepository userRepository;
    
//    이거 user에 id가 Long으로 바뀌면 고쳐질듯
    public TaleDtoResponse register(Long userId){
        Tale tale = new TaleDtoRequest().toTale();
//        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("member not exist"));
//        tale.setUser(user);

        return new TaleDtoResponse(taleRepository.save(tale
                .addUser(userRepository.findById(userId)
                        .orElseThrow(()->new IllegalArgumentException("id 다시주셈")))));
    }
    
//    public TaleDtoResponse findById(Long id){
//        return new TaleDtoResponse(taleRepository
//                .findById(id)
//                .orElseThrow(() ->
//                        new IllegalArgumentException("이 놈은 없엉ㅅ ")));
//    }


}
