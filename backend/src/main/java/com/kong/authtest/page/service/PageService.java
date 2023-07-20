package com.kong.authtest.page.service;

import com.kong.authtest.page.dto.PageDtoRequest;
import com.kong.authtest.page.dto.PageDtoResponse;
import com.kong.authtest.page.model.Page;
import com.kong.authtest.page.repository.PageRepository;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class PageService {
    private final PageRepository pageRepository;
    private final TaleRepository taleRepository;

    @Transactional
    public PageDtoResponse register(PageDtoRequest pageDtoRequest){
        Page page = pageDtoRequest.toPage();
        page.setSequence(findById(pageDtoRequest).
                        getPageList().size());
        return new PageDtoResponse(pageRepository.save(page
                .addTale(findById(pageDtoRequest))));
    }

    public PageDtoResponse detail(Long postId){
            return new PageDtoResponse(pageRepository.findById(postId).
                    orElseThrow(() -> new IllegalArgumentException("not found")));
    }

    private Tale findById(PageDtoRequest PageDtoRequest) {
        return taleRepository.findById(PageDtoRequest.getTaleId())
                .orElseThrow(() ->
                        new IllegalArgumentException("taleId 잘못줬음"));
    }


}
