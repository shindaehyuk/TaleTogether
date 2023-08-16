package com.kong.authtest.mail.dto;

import com.kong.authtest.mail.model.Mail;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
public class MailConfirmDto {
    @Email
    String email;
    String code;

}
