package com.kong.authtest.finalScriptPage.dto;


import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.finalScriptPage.domain.FinalScriptPage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinalScriptPageRequest {

    private String content;
    @NotNull
    private String image;
    private Long taleId;
    private int sequence;

    public FinalScriptPage toFinalScriptPage(){
        return FinalScriptPage.builder()
                .content(new Content(this.content))
                .image(this.image)
                .sequence(this.sequence)
                .build();
    }

}
