package hr.blitz.juice.domain.model.stripe;

import hr.blitz.juice.domain.enumeration.PaymentServiceEnum;
import hr.blitz.juice.service.PaymentService;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class PaymentRequest {
    private Long amount;
    private PaymentServiceEnum paymentService;
    private Map<String, String> metadata;
    private Object data;
}
