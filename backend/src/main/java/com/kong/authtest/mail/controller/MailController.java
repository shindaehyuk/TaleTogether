package com.kong.authtest.mail.controller;

import com.kong.authtest.mail.dto.MailConfirmDto;
import com.kong.authtest.mail.service.MailService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/mail")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@Api(tags = "mail")
public class MailController {

    private final MailService mailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendMail(@RequestBody MailConfirmDto mailConfirmDto) throws  Exception{
        String code = mailService.sendMail(mailConfirmDto.getEmail());
        System.out.println("인증코드 : " + code);
        return ResponseEntity.ok(code);
    }

    @PostMapping("/confirm")
    public ResponseEntity<Boolean> confirmMail(@RequestBody MailConfirmDto mailConfirmDto) throws Exception{
        return ResponseEntity.ok(mailService.confirmCode(mailConfirmDto));
    }
}
