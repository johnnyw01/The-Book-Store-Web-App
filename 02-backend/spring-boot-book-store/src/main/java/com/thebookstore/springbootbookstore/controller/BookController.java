package com.thebookstore.springbootbookstore.controller; // Specifies the package in which this class resides

import com.thebookstore.springbootbookstore.entity.Book; // Imports the Book class from the specified package
import com.thebookstore.springbootbookstore.service.BookService; // Imports the BookService class from the specified package
import org.springframework.beans.factory.annotation.Autowired; // Imports the annotation for autowiring dependencies
import org.springframework.web.bind.annotation.*; // Imports annotations for defining HTTP endpoints and handling requests

@CrossOrigin("http://localhost:3000") // Enables cross-origin resource sharing for requests coming from http://localhost:3000
@RestController // Indicates that this class serves as a RESTful controller that handles HTTP requests and returns JSON responses
@RequestMapping("/api/books") // Specifies the base URL path for all endpoints in this controller
public class BookController {
    private BookService bookService; // Reference to the BookService class

    @Autowired // Automatically injects an instance of BookService into this controller
    public BookController(BookService bookService){
        this.bookService = bookService;
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId){
        String userEmail = "testuser@email.com"; // The user's email address
        return bookService.checkoutBookByUser(userEmail, bookId); // Calls the checkoutBookByUser method of the BookService to check if the book is checked out by the user and returns a Boolean result
    }

    @PutMapping("/secure/checkout") // Maps HTTP PUT requests to the /secure/checkout endpoint
    public Book checkoutBook (@RequestParam Long bookId) throws Exception {
        String userEmail = "testuser@email.com"; // The user's email address
        return bookService.checkoutBook(userEmail, bookId); // Calls the checkoutBook method of the BookService to process the book checkout and returns the Book object
    }
}
