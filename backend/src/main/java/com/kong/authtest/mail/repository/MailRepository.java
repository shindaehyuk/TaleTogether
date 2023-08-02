package com.kong.authtest.mail.repository;

import com.kong.authtest.mail.model.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MailRepository extends JpaRepository<Mail, Long> {
    Boolean existsMailByEmail(String email);
    Boolean existsMailByCodeAndEmail(String code, String email);
    Mail findMailByEmail(String email);

    Mail findMailByCodeAndEmail(String code, String email);
}
