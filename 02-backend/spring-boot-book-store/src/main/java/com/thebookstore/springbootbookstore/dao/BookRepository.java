package com.thebookstore.springbootbookstore.dao;

import com.thebookstore.springbootbookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface BookRepository extends JpaRepository<Book, Long> {
    // This interface extends JpaRepository, which provides basic CRUD operations for the Book entity.

    // Method to find books by title containing a specific string
    // @RequestParam("title") specifies that the "title" parameter should be obtained from the request URL
    // Pageable parameter enables pagination of results
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    // Method to find books by category
    // @RequestParam("category") specifies that the "category" parameter should be obtained from the request URL
    // Pageable parameter enables pagination of results
    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);
}
