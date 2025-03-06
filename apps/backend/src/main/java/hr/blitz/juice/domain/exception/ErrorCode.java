package hr.blitz.juice.domain.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    BAD_REQUEST(400, "client side error", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED(401, "user is not authorized", HttpStatus.UNAUTHORIZED),
    FORBIDDEN(403, "user is not permited for this action", HttpStatus.FORBIDDEN),
    NOT_FOUND(404, "not found", HttpStatus.NOT_FOUND),
    CONFLICT(409, "resource already exists", HttpStatus.CONFLICT);

    private final int code;
    private final String message;
    private final HttpStatus status;

    ErrorCode(int code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

}