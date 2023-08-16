package com.kong.authtest.tale.dto;

import com.kong.authtest.finalScriptPage.dto.FinalScriptPageResponse;
import com.kong.authtest.page.dto.PageDtoResponse;
import com.kong.authtest.tale.model.Tale;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class TaleDtoGetResponse {
    private Long taleId;
    private String title;

    private String titleImage;
    private List<PageDtoResponse> PageList;
    private List<FinalScriptPageResponse> finalScriptPageList;


    public TaleDtoGetResponse(Tale tale) {
        this.taleId = tale.getTaleId();
        this.titleImage = tale.getTitleImage();
        this.title = tale.getTitle();
        this.PageList = tale.getPageList().stream().map(PageDtoResponse::new).collect(Collectors.toList());
        this.finalScriptPageList = tale.getFinalScriptPageList().stream().map(FinalScriptPageResponse::new).collect(Collectors.toList());
    }
}
