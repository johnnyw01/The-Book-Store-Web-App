package com.thebookstore.springbootbookstore.entity;

import jakarta.persistence.*; // Importing Jakarta Persistence API
import lombok.Data; // Importing Lombok @Data annotation for generating boilerplate code

@Entity // Indicates that this class is an entity and will be mapped to a database table
@Table(name="book") // Specifies the table name for the entity
@Data // Generates boilerplate code like getters, setters, equals, hashCode, and toString

public class Book {
    @Id // Specifies the primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies that the primary key values are automatically generated
    @Column(name = "id") // Specifies the column name for the field

    private Long id; // Declaring a private field 'id' of type Long
    @Column(name = "title") // Specifies the column name for the field

    private String title; // Declaring a private field 'title' of type String
    @Column(name = "author") // Specifies the column name for the field

    private String author; // Declaring a private field 'author' of type String
    @Column(name = "description") // Specifies the column name for the field

    private String description; // Declaring a private field 'description' of type String
    @Column(name = "copies") // Specifies the column name for the field

    private int copies; // Declaring a private field 'copies' of type int
    @Column(name = "copies_available") // Specifies the column name for the field

    private int copiesAvailable; // Declaring a private field 'copiesAvailable' of type int
    @Column(name = "category") // Specifies the column name for the field

    private String category; // Declaring a private field 'category' of type String
    @Column(name = "img") // Specifies the column name for the field

    private String img; // Declaring a private field 'img' of type String
}
