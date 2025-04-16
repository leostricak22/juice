package hr.blitz.juice.domain.model.stripe;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaymentRequest {
    private Long amount;
    private String currency="eur";
    private String description="";
}
