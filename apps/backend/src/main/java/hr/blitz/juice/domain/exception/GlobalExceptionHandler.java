package hr.blitz.juice.domain.exception;

import hr.blitz.juice.rest.dto.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<MessageResponse> handleException(AppException ex) {
        MessageResponse messageResponse = MessageResponse.builder()
                .message(ex.getMessage())
                .build();
        
        return new ResponseEntity<>(messageResponse, ex.getErrorCode().getStatus());
    }
}