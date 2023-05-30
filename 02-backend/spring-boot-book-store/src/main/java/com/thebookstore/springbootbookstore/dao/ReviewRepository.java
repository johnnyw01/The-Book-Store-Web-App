package com.thebookstore.springbootbookstore.dao;

import com.thebookstore.springbootbookstore.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    // This interface extends JpaRepository, which provides basic CRUD operations for the Review entity.

    // Method to find reviews by book ID
    // @RequestParam("book_id") specifies that the "book_id" parameter should be obtained from the request URL
    // It takes two parameters: bookId (the ID of the book to find reviews for) and pageable (for pagination of results)
    Page<Review> findByBookId(@RequestParam("book_id") Long bookId, Pageable pageable);
}
