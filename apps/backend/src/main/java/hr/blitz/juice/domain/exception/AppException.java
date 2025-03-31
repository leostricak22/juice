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

    public String toJSON() {
        StringBuilder json = new StringBuilder("{");
        json.append("\"status\":").append(status).append(",");
        json.append("\"message\":\"").append(getMessage()).append("\",");

        if (!fields.isEmpty()) {
            json.append("\"fields\":{");
            for (Map.Entry<String, String> entry : fields.entrySet()) {
                json.append("\"").append(entry.getKey()).append("\":\"").append(entry.getValue()).append("\",");
            }
            json.deleteCharAt(json.length() - 1); // Remove last comma
            json.append("}");
        }

        json.append("}");
        return json.toString();
    }
}