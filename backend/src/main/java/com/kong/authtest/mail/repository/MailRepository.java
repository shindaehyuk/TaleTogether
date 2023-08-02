package com.kong.authtest.mail.repository;

import com.kong.authtest.mail.model.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MailRepository extends JpaRepository<Mail, Long> {
    Optional<Mail> deleteByCodeAndEmail(String code, String email);
    Boolean existsByCode(String code);

    Boolean existsByCodeAndEmail(String code, String email);
}
