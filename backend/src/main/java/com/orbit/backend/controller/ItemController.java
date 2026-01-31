package com.orbit.backend.controller;

import com.orbit.backend.entity.Item;
import com.orbit.backend.entity.User;
import com.orbit.backend.service.ItemService;
import com.orbit.backend.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;
    private final UserService userService;

    public ItemController(ItemService itemService, UserService userService) {
        this.itemService = itemService;
        this.userService = userService;
    }

    @GetMapping
    public List<Item> getAllItems(@RequestParam(required = false) Item.ItemType type) {
        return itemService.getAllItems(type);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        return itemService.getItem(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Item> createItem(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("type") Item.ItemType type,
            @RequestParam("category") String category,
            @RequestParam("location") String location,
            @RequestParam(value = "date", required = false) String dateStr,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "contactInfo", required = false) String contactInfo,
            @RequestHeader("Authorization") String authHeader) throws IOException {

        User user = userService.getUserFromAuthHeader(authHeader);
        Item item = itemService.createItem(title, description, type, category, location, dateStr, image, contactInfo,
                user);
        return ResponseEntity.ok(item);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateItem(
            @PathVariable Long id,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "type", required = false) Item.ItemType type,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "date", required = false) String dateStr,
            @RequestParam(value = "status", required = false) Item.Status status,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "contactInfo", required = false) String contactInfo,
            @RequestHeader("Authorization") String authHeader) throws IOException {

        try {
            User user = userService.getUserFromAuthHeader(authHeader);
            Item updatedItem = itemService.updateItem(id, title, description, type, category, location, dateStr, status,
                    image, contactInfo, user);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Not authorized")) {
                return ResponseEntity.status(403).body(e.getMessage());
            }
            if (e.getMessage().contains("Item not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        try {
            User user = userService.getUserFromAuthHeader(authHeader);
            itemService.deleteItem(id, user);
            return ResponseEntity.ok("Item deleted successfully");
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Not authorized")) {
                return ResponseEntity.status(403).body(e.getMessage());
            }
            if (e.getMessage().contains("Item not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/search")
    public List<Item> search(@RequestParam("q") String query,
            @RequestParam(value = "type", required = false) Item.ItemType type) {
        return itemService.search(query, type);
    }

    @GetMapping(value = "/{id}/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getItemImage(@PathVariable Long id) {
        byte[] imageData = itemService.getItemImage(id);
        if (imageData != null) {
            return ResponseEntity.ok(imageData);
        }
        return ResponseEntity.notFound().build();
    }
}
