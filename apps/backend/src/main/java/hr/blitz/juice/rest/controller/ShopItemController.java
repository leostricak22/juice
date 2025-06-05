package hr.blitz.juice.rest.controller;

import hr.blitz.juice.domain.model.ShopItem;
import hr.blitz.juice.repository.ShopItemRepository;
import hr.blitz.juice.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shop-items")
@RequiredArgsConstructor
public class ShopItemController {

    private final ShopItemRepository shopItemRepository;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<ShopItem> createShopItem(@RequestBody ShopItem shopItem) {
        shopItem.setUser(jwtService.getUserFromSession());
        return ResponseEntity.ok(shopItemRepository.save(shopItem));
    }

    @GetMapping
    public ResponseEntity<Iterable<ShopItem>> getAllShopItems() {
        return ResponseEntity.ok(shopItemRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShopItem> getShopItemById(@PathVariable String id) {
        return shopItemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}