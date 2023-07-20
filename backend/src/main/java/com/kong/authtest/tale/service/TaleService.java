package com.kong.authtest.tale.service;

import com.kong.authtest.images.dto.ImagesDtoRequest;
import com.kong.authtest.images.dto.ImagesDtoResponse;
import com.kong.authtest.story.dto.StoryDtoRequest;
import com.kong.authtest.story.dto.StoryDtoResponse;
import com.kong.authtest.tale.dto.TaleDtoGetRequest;
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
public class TaleService {

    private final TaleRepository taleRepository;
    private final UserRepository userRepository;

    //    이거 user에 id가 Long으로 바뀌면 고쳐질듯

    @Transactional
    public TaleDtoResponse register(TaleDtoRequest taleDtoRequest) {
        User user = userRepository.findUserById(taleDtoRequest.getUserId()).orElseThrow();
        return new TaleDtoResponse(taleRepository.save(new TaleDtoRequest().toTale().addUser(user)));
    }

    public List<ImagesDtoResponse> imageList(TaleDtoGetRequest taleDtoGetRequest){
        return taleRepository.findById(taleDtoGetRequest.getTaleId()).get().getImagesList()
                .stream()
                .map(ImagesDtoResponse::new)
                .collect(Collectors.toList());
    }

    public List<StoryDtoResponse> storyList(TaleDtoGetRequest taleDtoGetRequest){
        return taleRepository.findById(taleDtoGetRequest.getTaleId()).get().getStoryList()
                .stream()
                .map(StoryDtoResponse::new)
                .collect(Collectors.toList());
    }

    public TaleDtoGetResponse getTaleInfo(TaleDtoGetRequest taleDtoGetRequest){
        TaleDtoGetResponse taleDtoGetResponse = new TaleDtoGetResponse(taleDtoGetRequest.toTale());
        taleDtoGetResponse.setImageList(imageList(taleDtoGetRequest));
        taleDtoGetResponse.setStoryList(storyList(taleDtoGetRequest));
        System.out.println(taleDtoGetResponse.toString());
        return taleDtoGetResponse;
    }

}
