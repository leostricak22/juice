package hr.blitz.juice.domain.model;

import hr.blitz.juice.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document(collection = "shop_item")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShopItem {

    private String id;
    private String name;
    private String description;
    private BigDecimal price;
    private String image;
    private User user;
}
