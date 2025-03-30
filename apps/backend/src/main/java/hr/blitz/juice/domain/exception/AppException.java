package hr.blitz.juice.domain.exception;

import hr.blitz.juice.rest.dto.MessageResponse;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class AppException extends RuntimeException {
    private final int status;
    private final Map<String, String> fields;

    public AppException(int status, String message) {
        super(message);
        this.status = status;
        this.fields = new HashMap<>();
    }

    public AppException(int status, String message, Map<String, String> fields) {
        super(message);
        this.status = status;
        this.fields = fields;
    }

    public int getStatus() {
        return status;
    }

    public Map<String, String> getFields() {
        return fields;
    }
}