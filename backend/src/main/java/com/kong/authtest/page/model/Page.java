package com.kong.authtest.page.model;

import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.tale.model.Tale;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PageId;

    @Embedded
    private Content content;

    private String image;

    private int sequence;

    @ManyToOne
    @JoinColumn(name = "tale_id")
    private Tale tale;

    public Page addTale(Tale tale) {
        this.tale = tale;
        return this;
    }

}
