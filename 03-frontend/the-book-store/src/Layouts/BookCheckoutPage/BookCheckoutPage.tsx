import React, {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const bookId = (window.location.pathname).split('/')[2];

    //useEffect Hook
    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8082/api/books/${bookId}`;

            const response = await fetch(baseUrl);

            if(!response.ok){
                throw new Error("Something went wrong!");
            }

            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error:any)=>{
            setIsLoading(false);
            setHttpError(error.message);
        })
    },[]);

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


    return (
        <div>
            <h3>Hi World</h3>
        </div>
    );
}