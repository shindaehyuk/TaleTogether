package com.kong.authtest.page.dto;

import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.page.model.Page;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class PageDtoRequest {
    private String content;
    @NotNull
    private String image;
    private Long taleId;


    public Page toPage() {
        return Page.builder()
                .content(new Content(this.content))
                .image(this.image)
                .build();
    }
}
