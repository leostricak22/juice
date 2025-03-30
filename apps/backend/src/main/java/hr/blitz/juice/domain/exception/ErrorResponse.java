package hr.blitz.juice.domain.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class ErrorResponse {
    private final String message;
    private final int status;
    private final Map<String, String> fields;

    public ErrorResponse(String message, int status, Map<String, String> fields) {
        this.message = message;
        this.status = status;
        this.fields = fields;
    }

}
