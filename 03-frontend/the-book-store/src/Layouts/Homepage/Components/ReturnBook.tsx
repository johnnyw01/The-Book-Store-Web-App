import React from "react";


export const ReturnBook = () => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                <img
                    src={require('/Users/johnnywells/IdeaProjects/The-Book-Store-Web-App/03-frontend/the-book-store/src/Images/BookImages/book-luv2code-1000.png')}
                    width='151'
                    height='233'
                    alt="book"
                />
                <h6 className='mt-2'>Book</h6>
                <p>The Book Store</p>
                <a className='btn main-color text-white' href='#'>Reserve</a>
            </div>
        </div>
    );
}