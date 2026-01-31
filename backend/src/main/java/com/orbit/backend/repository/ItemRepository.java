package com.orbit.backend.repository;

import com.orbit.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByType(Item.ItemType type);

    List<Item> findByUserId(Long userId);

    List<Item> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);

    @org.springframework.data.jpa.repository.Query("SELECT i FROM Item i WHERE (LOWER(i.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(i.location) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(i.category) LIKE LOWER(CONCAT('%', :query, '%'))) AND (:type IS NULL OR i.type = :type)")
    List<Item> searchByQueryAndType(@org.springframework.data.repository.query.Param("query") String query,
            @org.springframework.data.repository.query.Param("type") Item.ItemType type);
}
