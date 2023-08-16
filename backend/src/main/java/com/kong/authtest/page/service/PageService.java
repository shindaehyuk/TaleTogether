package com.kong.authtest.page.service;

import com.kong.authtest.page.dto.PageDtoPutRequest;
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
    public PageDtoResponse register(PageDtoRequest pageDtoRequest) {
        Page page = pageDtoRequest.toPage();
        page.addSequence(findById(pageDtoRequest).
                getPageList().size() + 1);
        return new PageDtoResponse(pageRepository.save(page
                .addTale(findById(pageDtoRequest))));
    }

    public PageDtoResponse detail(Long postId) {
        return new PageDtoResponse(getPage(postId));
    }

    @Transactional
    public PageDtoResponse modify(PageDtoPutRequest pageDtoPutRequest) {
        return new PageDtoResponse(getPage(pageDtoPutRequest.getPageId())
                .updatePage(pageDtoPutRequest));
    }

    @Transactional
    public void delete(Long pageId) {
        pageRepository.deleteById(pageId);
    }

    private Tale findById(PageDtoRequest PageDtoRequest) {
        return taleRepository.findById(PageDtoRequest.getTaleId())
                .orElseThrow(() ->
                        new IllegalArgumentException("taleId 잘못줬음"));
    }

    private Page getPage(Long postId) {
        return pageRepository.findById(postId).
                orElseThrow(() -> new IllegalArgumentException("not found"));
    }

}
