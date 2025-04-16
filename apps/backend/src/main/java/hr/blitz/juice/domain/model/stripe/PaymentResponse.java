package hr.blitz.juice.domain.model.stripe;

public class PaymentResponse {
    private String clientSecret;
    private String publicKey;

    public PaymentResponse(String clientSecret, String publicKey) {
        this.clientSecret = clientSecret;
        this.publicKey = publicKey;
    }

    // Getters
    public String getClientSecret() {
        return clientSecret;
    }

    public String getPublicKey() {
        return publicKey;
    }
}
