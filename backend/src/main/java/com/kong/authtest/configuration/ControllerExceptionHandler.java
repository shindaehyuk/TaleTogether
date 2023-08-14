package com.kong.authtest.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.persistence.EntityNotFoundException;

@ControllerAdvice
public class ControllerExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ControllerExceptionHandler.class);

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당하는 tale이 없습니다.");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception e) {
        log.error("서버에서 오류 발생", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
    }
}
