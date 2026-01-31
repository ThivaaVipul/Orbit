package com.orbit.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private ItemType type; // LOST or FOUND

    private String category;
    private String location;
    private LocalDate date;

    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    @Enumerated(EnumType.STRING)
    private Status status; // OPEN, RESOLVED

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String contactInfo;

    public enum ItemType {
        LOST, FOUND
    }

    public enum Status {
        OPEN, RESOLVED
    }
}
