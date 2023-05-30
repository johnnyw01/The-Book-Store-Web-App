package com.thebookstore.springbootbookstore.service;

import com.thebookstore.springbootbookstore.dao.BookRepository;
import com.thebookstore.springbootbookstore.dao.CheckoutRepository;
import com.thebookstore.springbootbookstore.entity.Book;
import com.thebookstore.springbootbookstore.entity.Checkout;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {

    // Instance variables for book repository and checkout repository
    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;

    // Constructor that initializes the book repository and checkout repository
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    // Method to checkout a book
    public Book checkoutBook (String userEmail, Long bookId) throws Exception{
        // Find the book with the given bookId
        Optional<Book> book = bookRepository.findById(bookId);

        // Check if the book is already checked out by the user
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        // If the book doesn't exist, is already checked out, or has no available copies, throw an exception
        if(!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0){
            throw new Exception("Book doesn't exist or already checked out by user");
        }

        // Reduce the number of available copies of the book by 1
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() -1 );
        bookRepository.save(book.get());

        // Create a new checkout entry with the user email, current date, due date, and book ID
        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId()
        );

        // Save the checkout entry
        checkoutRepository.save(checkout);

        // Return the book that was checked out
        return book.get();
    }
}
