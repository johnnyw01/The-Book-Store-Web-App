import React, {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {SearchBook} from "./components/SearchBook";
import {Pagination} from "../Utils/Pagination";
import { ChangeEvent, KeyboardEvent } from 'react';



export const SearchBooksPage =()=>{
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Book category');

    //useEffect Hook
    useEffect(()=>{
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8082/api/books";
            let url: string = '';

            //If search URL is equal to an empty string (which is how it starts off as), search for all the books in the database.
            if(searchUrl === ''){
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            }else{
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                // Search URL is equal to the user's query
                url = baseUrl + searchWithPage
            }

            const response = await fetch(url);


            if(!response.ok){
                throw new Error("Something went wrong!");
            }

            const responseJson = await response.json();
            console.log(responseJson)
            const responseData = responseJson._embedded.books;
            console.log(responseData)

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

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
            console.log(error.message)
        })
        //Each time the useEffect gets called, the window.scrollTo method will scroll to the top of the page
        window.scrollTo(0,0);
        //useEffect will be invoked everytime the current page changes (e.g. pagination change, etc.) or the search URL changes (if a user is searching for a book).
    },[currentPage, searchUrl]);

    if(isLoading){
        return (
            <SpinnerLoading />
        )
    }

    if(httpError){
        return (
            <div className='container mt-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    // Update the searchHandleChange function to set the search state
    const searchHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

// New function to update the searchUrl state
    const performSearch = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
        }
        setCategorySelection('Book category');
    };

// Update the handleEnterKey function to invoke the performSearch function
    const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    };

    //checks if the input value matches certain categories and sets the category selection and search URL accordingly.
    const categoryField = (value: string) => {
        setCurrentPage(1);
        if(
            value.toLowerCase() === 'fe' ||
            value.toLowerCase() === 'be' ||
            value.toLowerCase() === 'data' ||
            value.toLowerCase() === 'devops'
        ){
            setCategorySelection(value)
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        }else{
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
    };


    const indexOfLastBook : number = currentPage * booksPerPage;
    const indexOfFirstBook : number = indexOfLastBook - booksPerPage ;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber : number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                               { /*Input captures the search state change every time a letter is typed in the search bar, the button invokes the searchHandleChange function*/}
                                <input className='form-control me-2' type='search'
                                       placeholder='Search' aria-labelledby='Search'
                                       onChange={searchHandleChange}
                                       onKeyDown={handleEnterKey}
                                    />
                                <button className='btn btn-outline-success'
                                        onClick={performSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                        id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                        aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={()=>{categoryField('All')}}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={()=>{categoryField('FE')}}>
                                        <a className='dropdown-item' href='#'>
                                            Front End
                                        </a>
                                    </li>
                                    <li onClick={()=>{categoryField('BE')}}>
                                        <a className='dropdown-item' href='#'>
                                            Back End
                                        </a>
                                    </li>
                                    <li onClick={()=>{categoryField('Data')}}>
                                        <a className='dropdown-item' href='#'>
                                            Data
                                        </a>
                                    </li>
                                    <li onClick={()=>{categoryField('DevOps')}}>
                                        <a className='dropdown-item' href='#'>
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* The ternary operator checks if the total amount of books is greater than 0. If it is, it renders the section displaying the number of results, the range of displayed items, and the list of books. If the total amount of books is not greater than 0, it renders a message stating that the desired books cannot be found and provides a link to Library Services. */}
                    {totalAmountOfBooks > 0 ?
                    <>
                    <div className='mt-3'>
                        <h5>Number of results: ({totalAmountOfBooks})</h5>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                    </p>
                    {books.map(book => (
                        <SearchBook book={book} key={book.id} />
                    ))}
                    </>
                        :
                        <div className='mt-5'>
                            <h3>Can't find what you're looking for?</h3>
                            <a type='button' className='btn main-color btn-md px-4 me-md-2 mt-3 mb-5 fw-bold text-white' href="#">Library Services</a>
                        </div>
                    }

                    {/*total pages is greater than 1 (&& means 'render this'), than render the pagination, if not, then it will not render the pagination*/}
                    {totalPages > 1 &&
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                        }
                </div>
            </div>
        </div>
    )
}