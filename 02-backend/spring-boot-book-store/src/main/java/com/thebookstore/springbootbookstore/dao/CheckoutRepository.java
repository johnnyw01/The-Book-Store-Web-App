package com.thebookstore.springbootbookstore.dao;

import com.thebookstore.springbootbookstore.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    // This interface extends JpaRepository, which provides basic CRUD operations for the Checkout entity.

    // Method to find a Checkout entry by user email and book ID
    // It takes two parameters: userEmail (the email of the user) and bookId (the ID of the book)
    // The method signature implies that it will return a single Checkout object
    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);
}
