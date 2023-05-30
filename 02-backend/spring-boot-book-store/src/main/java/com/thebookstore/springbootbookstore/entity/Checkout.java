package com.thebookstore.springbootbookstore.entity;

import jakarta.persistence.*; // Importing Jakarta Persistence API for database annotations
import lombok.Data; // Importing Lombok library for generating boilerplate code

@Entity // Indicates that this class is an entity and should be mapped to a database table
@Table(name = "checkout") // Specifies the name of the database table to which this entity is mapped
@Data // Generates boilerplate code for getters, setters, equals, hashCode, and toString methods
public class Checkout {

    @Id // Specifies the primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies the generation strategy for the primary key
    @Column(name = "id") // Specifies the mapping of the field to the corresponding database column
    private Long id; // Represents the unique identifier for a checkout record

    @Column(name = "user_email") // Specifies the mapping of the field to the corresponding database column
    private String userEmail; // Represents the email of the user who made the checkout

    @Column(name = "checkout_date") // Specifies the mapping of the field to the corresponding database column
    private String checkoutDate; // Represents the date when the checkout was made

    @Column(name = "return_date") // Specifies the mapping of the field to the corresponding database column
    private String returnDate; // Represents the expected return date for the book

    @Column(name = "book_id") // Specifies the mapping of the field to the corresponding database column
    private Long bookId; // Represents the ID of the book being checked out


    public Checkout () {} // Default constructor

    public Checkout (String userEmail, String checkoutDate, String returnDate, Long bookId){
        this.userEmail = userEmail; // Assigns the provided user email to the instance variable
        this.checkoutDate = checkoutDate; // Assigns the provided checkout date to the instance variable
        this.returnDate = returnDate; // Assigns the provided return date to the instance variable
        this.bookId = bookId; // Assigns the provided book ID to the instance variable
    }
}
