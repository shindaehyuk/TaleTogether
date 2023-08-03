package com.kong.authtest.common.commonValidation;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Content {

    @Column(length = 100000)
    private String content;

    public Content(String content) {
        validation(content);
        this.content = content;
    }

    private void validation(String content) {
        validateContentNotEmpty(content);
        checkContentLength(content);

    }

    private void validateContentNotEmpty(String content) {
        if (Objects.isNull(content) || content.isEmpty()) {
            throw new IllegalArgumentException("반드시 넣어야 함");
        }
    }

    private void checkContentLength(String content) {
        if (content.length() <= 0 || content.length() > 100000) {
            throw new IllegalArgumentException("글의 길이는 100000 자 이상 불가능 합니다");
        }
    }
}
