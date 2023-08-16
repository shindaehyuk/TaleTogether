package com.kong.authtest.finalScriptPage.domain;


import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.page.model.Page;
import com.kong.authtest.tale.model.Tale;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FinalScriptPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Content content;
    @NotNull
    private String image;

    @ManyToOne
    private Tale tale;

    public FinalScriptPage addTale(Tale tale) {
        this.tale = tale;
        return this;
    }



}
