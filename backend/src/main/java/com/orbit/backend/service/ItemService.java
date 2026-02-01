package com.orbit.backend.service;

import com.orbit.backend.entity.Item;
import com.orbit.backend.entity.User;
import com.orbit.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems(Item.ItemType type) {
        if (type != null) {
            return itemRepository.findByType(type);
        }
        return itemRepository.findAll();
    }

    public Optional<Item> getItem(Long id) {
        return itemRepository.findById(id);
    }

    public Item createItem(String title, String description, Item.ItemType type, String category,
            String location, String dateStr, MultipartFile image, String contactInfo, User user) throws IOException {
        Item item = new Item();
        item.setTitle(title);
        item.setDescription(description);
        item.setType(type);
        item.setCategory(category);
        item.setLocation(location);

        if (dateStr != null && !dateStr.isEmpty()) {
            item.setDate(LocalDate.parse(dateStr));
        } else {
            item.setDate(LocalDate.now());
        }

        item.setStatus(Item.Status.OPEN);
        item.setUser(user);
        item.setContactInfo(contactInfo);

        if (image != null && !image.isEmpty()) {
            item.setImageData(image.getBytes());
        }

        return itemRepository.save(item);
    }

    public Item updateItem(Long id, String title, String description, Item.ItemType type, String category,
            String location, String dateStr, Item.Status status, MultipartFile image,
            String contactInfo, User user) throws IOException {

        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getUser().getUsername().equals(user.getUsername())) {
            throw new RuntimeException("Not authorized to update this item");
        }

        if (title != null)
            item.setTitle(title);
        if (description != null)
            item.setDescription(description);
        if (type != null)
            item.setType(type);
        if (category != null)
            item.setCategory(category);
        if (location != null)
            item.setLocation(location);

        if (dateStr != null && !dateStr.isEmpty()) {
            item.setDate(LocalDate.parse(dateStr));
        }

        if (status != null)
            item.setStatus(status);
        if (contactInfo != null)
            item.setContactInfo(contactInfo);

        if (image != null && !image.isEmpty()) {
            item.setImageData(image.getBytes());
        }

        return itemRepository.save(item);
    }

    public void deleteItem(Long id, User user) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        boolean isAdmin = user.getRole() == User.Role.ADMIN;
        if (!item.getUser().getUsername().equals(user.getUsername()) && !isAdmin) {
            throw new RuntimeException("Not authorized to delete this item");
        }

        itemRepository.delete(item);
    }

    public List<Item> search(String query, Item.ItemType type) {
        return itemRepository.searchByQueryAndType(query, type);
    }

    public byte[] getItemImage(Long id) {
        return itemRepository.findById(id)
                .map(Item::getImageData)
                .orElse(null);
    }
}
