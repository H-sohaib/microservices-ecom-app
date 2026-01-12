package tech.sohaib_tarek.productservice.service;

import tech.sohaib_tarek.productservice.dto.ProductRequest;
import tech.sohaib_tarek.productservice.dto.ProductResponse;
import tech.sohaib_tarek.productservice.dto.StockUpdateRequest;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse getProductById(Long productId);

    List<ProductResponse> getAllProducts();

    ProductResponse updateProduct(Long productId, ProductRequest request);

    void deleteProduct(Long productId);

    boolean checkStock(Long productId, Integer quantity);

    void reduceStock(List<StockUpdateRequest> stockUpdates);

    void restoreStock(List<StockUpdateRequest> stockUpdates);
}

