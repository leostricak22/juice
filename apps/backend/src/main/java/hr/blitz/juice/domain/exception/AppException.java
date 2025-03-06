package hr.blitz.juice.domain.exception;

import hr.blitz.juice.rest.dto.MessageResponse;
import lombok.Getter;

@Getter
public class AppException extends RuntimeException {

    private final ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public AppException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public MessageResponse toMessageResponse() {
        return MessageResponse.builder()
                .message(super.getMessage())
                .build();
    }
}