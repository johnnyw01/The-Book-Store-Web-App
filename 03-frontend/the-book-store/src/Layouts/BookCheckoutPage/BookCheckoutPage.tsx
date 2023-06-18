import React, {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {StarsReview} from "../Utils/StarsReview";
import {CheckoutAndReviewBox} from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import {LatestReviews} from "./LatestReviews";
import {useOktaAuth} from "@okta/okta-react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const BookCheckoutPage = () => {

    const {authState} = useOktaAuth();
    const [book, setBook] = useState<BookModel>(); // State variable to store the book data
    const [isLoading, setIsLoading] = useState(true); // State variable to track loading state
    const [httpError, setHttpError] = useState(null); // State variable to track HTTP error

    //Review State

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    //Loans Count State
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    //Is Book Checked Out?
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingBookCheckedOut,setIsLoadingBookCheckedOut] = useState(true);

    // Extracting the book ID from the URL
    const bookId = (window.location.pathname).split('/')[2];

    // useEffect Hook to fetch book data when the component mounts
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

            setBook(loadedBook); // Set the loaded book data in the state variable

            setIsLoading(false); // Set isLoading to false after successfully fetching and processing data
        };

        fetchBook().catch((error:any)=>{
            setIsLoading(false); // Update the loading state to false
            setHttpError(error.message); // Set the HTTP error message in the state variable
        })
    }, []);



    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8082/api/reviews/search/findByBookId?bookId=${bookId}`;

            const responseReviews = await fetch(reviewUrl);

            if(!responseReviews.ok){
                throw new Error("Something went wrong!"); // Throw an error if the response is not OK
            }

            if(!responseReviews.ok){
                throw new Error(`HTTP error! status: ${responseReviews.status}`);
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel [] = []

            let weightedStarReviews: number = 0;

            for (const key in responseData){
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }
            if(loadedReviews){
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews); // set loaded reviews

            setIsLoadingReview(false); // set isLoadingReview to false after successfully fetching and processing data
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        });
    }, []);


    console.log(isLoadingReview);

    useEffect(()=>{
        const fetchUserCurrentLoansCount = async ()=>{
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8082/api/books/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if(!currentLoansCountResponse.ok){
                    throw new Error('Something went wrong...');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);
        };
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState]);

    useEffect(()=>{
        const fetchUserCheckedOutBook = async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8082/api/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const bookCheckedOut = await fetch(url, requestOptions);

                if(!bookCheckedOut.ok){
                    throw new Error('Something went wrong...');
                }
                const bookCheckedOutResponseJson = await bookCheckedOut.json();
                setIsCheckedOut(bookCheckedOutResponseJson);
            }
            setIsLoadingBookCheckedOut(false);
        }
        fetchUserCheckedOutBook().catch((error:any) => {
            setIsLoadingBookCheckedOut(false);
            setHttpError(error.message);
        });
    }, [authState]);

    if(isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckedOut){
        return (
            <SpinnerLoading /> // Display a loading spinner while the book data is being fetched
        )
    }

    if(httpError){
        return (
            <div className='container mt-5'>
                <p>{httpError}</p> {/* Display an error message if there was an HTTP error */}
            </div>
        )
    }


    return (
            <div>
                <div className='container d-none d-lg-block'>
                    <div className='row mt-5'>
                        <div className='col-sm-2 col-md-2'>
                            {/* Render the book cover image */}
                            {book?.img ?
                                <img src={book?.img} width='226' height='349' alt='Book' />
                                :
                                <img src={require('/Users/johnnywells/IdeaProjects/The-Book-Store-Web-App/03-frontend/the-book-store/src/Images/BookImages/book-luv2code-1000.png')} width='226'
                                     height='349' alt='Book' />
                            }
                        </div>
                        <div className='col-4 col-md-4 container'>
                            <div className='ml-2'>
                                {/* Render the book title, author, description, and star rating */}
                                <h2>{book?.title}</h2>
                                <h5 className='text-primary'>{book?.author}</h5>
                                <p className='lead'>{book?.description}</p>
                                <StarsReview rating={4.5} size={32} />
                            </div>
                        </div>
                        <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount} />
                    </div>
                    <hr />
                    <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
                </div>
                <div className='container d-lg-none mt-5'>
                    <div className='d-flex justify-content-center align-items-center'>
                        {/* Render the book cover image */}
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt='Book' />
                            :
                            <img src={require('/Users/johnnywells/IdeaProjects/The-Book-Store-Web-App/03-frontend/the-book-store/src/Images/BookImages/book-luv2code-1000.png')} width='226'
                                 height='349' alt='Book' />
                        }
                    </div>
                    <div className='mt-4'>
                        <div className='ml-2'>
                            {/* Render the book title, author, description, and star rating */}
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarsReview rating={4.5} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount} />
                    <hr />
                    <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
                </div>
            </div>
    );
}