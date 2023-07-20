package com.kong.authtest.images.service;

import com.kong.authtest.images.dto.ImagesDtoRequest;
import com.kong.authtest.images.dto.ImagesDtoResponse;
import com.kong.authtest.images.model.Images;
import com.kong.authtest.images.repository.ImagesRepository;
import com.kong.authtest.tale.repository.TaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImagesRepository imagesRepository;
    private final TaleRepository taleRepository;

    @Transactional
    public ImagesDtoResponse register(ImagesDtoRequest imagesDtoRequest){
        return new ImagesDtoResponse(imagesRepository.save(imagesDtoRequest.toImages()
                .addTale(taleRepository.findById(imagesDtoRequest.getTaleId())
                        .orElseThrow(()->new IllegalArgumentException("taleId 잘못줌")))));
    }


}
