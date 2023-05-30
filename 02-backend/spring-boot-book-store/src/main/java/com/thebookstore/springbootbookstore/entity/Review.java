package com.thebookstore.springbootbookstore.entity;

import jakarta.persistence.*; // Importing Jakarta Persistence API for database annotations
import lombok.Data; // Importing Lombok library for generating boilerplate code
import org.hibernate.annotations.CreationTimestamp; // Importing Hibernate annotation for automatic timestamp generation
import java.util.Date; // Importing Java's Date class for date-related operations

@Entity // Indicates that this class is an entity and should be mapped to a database table
@Table(name = "review") // Specifies the name of the database table to which this entity is mapped
@Data // Generates boilerplate code for getters, setters, equals, hashCode, and toString methods
public class Review {
    @Id // Specifies the primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies the generation strategy for the primary key
    @Column(name = "id") // Specifies the mapping of the field to the corresponding database column
    private Long id; // Represents the unique identifier for a review record

    @Column(name = "user_email") // Specifies the mapping of the field to the corresponding database column
    private String userEmail; // Represents the email of the user who wrote the review

    @Column(name = "date") // Specifies the mapping of the field to the corresponding database column
    @CreationTimestamp // Automatically sets the value of this field to the current timestamp when the entity is created
    private Date date; // Represents the date when the review was created

    @Column(name = "rating") // Specifies the mapping of the field to the corresponding database column
    private double rating; // Represents the rating given by the user for a book

    @Column(name = "book_id") // Specifies the mapping of the field to the corresponding database column
    private Long bookId; // Represents the ID of the book being reviewed

    @Column(name = "review_description") // Specifies the mapping of the field to the corresponding database column
    private String reviewDescription; // Represents the description or content of the review
}
