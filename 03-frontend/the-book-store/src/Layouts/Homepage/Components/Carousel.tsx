import React from "react";
import { ReturnBook } from "./ReturnBook";
import {useEffect, useState} from "react";
import BookModel from "../../../models/BookModel";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const Carousel = () => {

    //Creat 3 states of the carousel:

    //Creates a state of an array of books
    const [books, setBooks] = useState<BookModel[]>([]);//Last part is "of type array"
    //Creates a state for loading
    const [isLoading, setIsLoading] = useState(true);
    //Creates a state for if the API fails
    const [httpError, setHttpError] = useState(null);

    //useEffect Hook
    useEffect(()=>{
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8081/api/books";
            const url: string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);

            if(!response.ok){
                throw new Error("Something went wrong!");
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;

            const loadedBooks: BookModel[] = [];
            for(const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                })
            }
            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error:any)=>{
            setIsLoading(false);
            setHttpError(error.message);
        })
    },[]);

    if(isLoading){
        return (
            <div className='container mt-5'>
                <p>Loading...</p>
            </div>
        )
    }

    if(httpError){
        return (
            <div className='container mt-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0,3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3,6).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6,9).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                            data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                            data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnBook book={books[7]} key={books[7].id} />
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <a className='btn btn-outline-secondary btn-lg' href='#'>View More</a>
            </div>
        </div>
    );
}