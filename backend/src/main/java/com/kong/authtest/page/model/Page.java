package com.kong.authtest.page.model;

import com.kong.authtest.common.baseEntity.BaseEntity;
import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.page.dto.PageDtoPutRequest;
import com.kong.authtest.tale.model.Tale;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Page extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pageId;

    @Embedded
    private Content content;
    @NotNull
    private String image;
    private int sequence = 1;

    @ManyToOne
    private Tale tale;

    public Page addTale(Tale tale) {
        this.tale = tale;
        return this;
    }

    public Page addSequence(int sequence) {
        this.sequence = sequence;
        return this;
    }

    public Page updatePage(PageDtoPutRequest pageDtoPutRequest) {
        this.content = new Content(pageDtoPutRequest.getContent());
        this.sequence = pageDtoPutRequest.getSequence();
        this.image = pageDtoPutRequest.getImage();
        return this;
    }

}
