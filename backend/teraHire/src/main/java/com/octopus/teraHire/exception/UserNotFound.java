package com.octopus.teraHire.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserNotFound extends RuntimeException {
    public UserNotFound() {
        super();
    }
    public UserNotFound(String message, Throwable cause) {
        super(message, cause);
    }
    public UserNotFound(String message) {
        super(message);
    }
    public UserNotFound(Throwable cause) {
        super(cause);
    }
}
