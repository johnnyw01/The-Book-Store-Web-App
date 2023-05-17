package com.thebookstore.springbootbookstore.dao;

import com.thebookstore.springbootbookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository <Book, Long>{
}
