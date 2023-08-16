package com.kong.authtest.finalScriptPage.service;


import com.kong.authtest.finalScriptPage.domain.FinalScriptPage;
import com.kong.authtest.finalScriptPage.dto.FinalScriptPageRequest;
import com.kong.authtest.finalScriptPage.dto.FinalScriptPageResponse;
import com.kong.authtest.finalScriptPage.repository.FinalScriptPageRepository;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
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
public class FinalScriptPageService {

    private final FinalScriptPageRepository finalScriptPageRepository;

    private final TaleRepository taleRepository;


    @Transactional
    public FinalScriptPageResponse register(FinalScriptPageRequest finalScriptPageRequest) {

        FinalScriptPage finalScriptPage = finalScriptPageRequest.toFinalScriptPage();


        return new FinalScriptPageResponse(finalScriptPageRepository.save(finalScriptPage
                .addTale(findById(finalScriptPageRequest))));

    }

    public List<FinalScriptPageResponse> findAll(Long taleId) {
        return findTaleById(taleId).getFinalScriptPageList()
                .stream()
                .map(FinalScriptPageResponse::new)
                .collect(Collectors.toList());
    }

    private Tale findTaleById(Long taleId) {
        return taleRepository.findById(taleId).orElseThrow(() -> new NoSuchElementException());
    }


    private Tale findById(FinalScriptPageRequest PageDtoRequest) {
        return taleRepository.findById(PageDtoRequest.getTaleId())
                .orElseThrow(() ->
                        new IllegalArgumentException("taleId 잘못줬음"));
    }
}
