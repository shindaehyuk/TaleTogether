package com.kong.authtest.finalScriptPage.service;


import com.kong.authtest.finalScriptPage.domain.FinalScriptPage;
import com.kong.authtest.finalScriptPage.dto.FinalScriptPageRequest;
import com.kong.authtest.finalScriptPage.dto.FinalScriptPageResponse;
import com.kong.authtest.finalScriptPage.repository.FinalScriptPageRepository;
import com.kong.authtest.page.dto.PageDtoRequest;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FinalScriptPageService {

    private final FinalScriptPageRepository finalScriptPageRepository;

    private final TaleRepository taleRepository;

    @Transactional
    public FinalScriptPageResponse register(FinalScriptPageRequest finalScriptPageRequest){

        FinalScriptPage finalScriptPage = finalScriptPageRequest.toFinalScriptPage();
        finalScriptPage.addSequence(findById(finalScriptPageRequest)
                .getFinalScriptPageList().size() + 1);

        return new FinalScriptPageResponse(finalScriptPageRepository.save(finalScriptPage
                .addTale(findById(finalScriptPageRequest))));

    }


    private Tale findById(FinalScriptPageRequest PageDtoRequest) {
        return taleRepository.findById(PageDtoRequest.getTaleId())
                .orElseThrow(() ->
                        new IllegalArgumentException("taleId 잘못줬음"));
    }
}
