package com.kong.authtest.finalScriptPage.dto;


import com.kong.authtest.finalScriptPage.domain.FinalScriptPage;
import com.kong.authtest.page.model.Page;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinalScriptPageResponse {

    private Long pageId;
    private String content;
    private String image;
    private int sequence;



    public FinalScriptPageResponse(FinalScriptPage page) {
        this.pageId = page.getId();
        this.content = page.getContent().getContent();
        this.sequence = page.getSequence();
        this.image = page.getImage();

    }


}
