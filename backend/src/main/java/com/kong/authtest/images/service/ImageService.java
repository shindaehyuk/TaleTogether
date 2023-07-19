package com.kong.authtest.images.service;

import com.kong.authtest.images.dto.ImagesDtoRequest;
import com.kong.authtest.images.dto.ImagesDtoResponse;
import com.kong.authtest.images.repository.ImagesRepository;
import com.kong.authtest.tale.repository.TaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImagesRepository imagesRepository;
    private final TaleRepository taleRepository;

    public ImagesDtoResponse register(ImagesDtoRequest imagesDtoRequest, Long taleId){
        return new ImagesDtoResponse(imagesRepository.save(imagesDtoRequest.toImages()
                .addTale(taleRepository.findById(taleId)
                        .orElseThrow(()->new IllegalArgumentException("taleId 잘못줌")))));
    }

}
