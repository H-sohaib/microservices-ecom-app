package net.anassploit.commandservice.client;

import net.anassploit.commandservice.dto.ProductResponse;
import net.anassploit.commandservice.dto.StockUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "product-service", path = "/api/products")
public interface ProductClient {

    @GetMapping("/{productId}")
    ProductResponse getProductById(@PathVariable("productId") Long productId);

    @GetMapping("/{productId}/check-stock")
    Boolean checkStock(@PathVariable("productId") Long productId, @RequestParam("quantity") Integer quantity);

    @PostMapping("/reduce-stock")
    void reduceStock(@RequestBody List<StockUpdateRequest> stockUpdates);

    @PostMapping("/restore-stock")
    void restoreStock(@RequestBody List<StockUpdateRequest> stockUpdates);
}

