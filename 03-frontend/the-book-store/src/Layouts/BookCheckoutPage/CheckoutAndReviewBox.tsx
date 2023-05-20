import React from "react";
import BookModel from "../../models/BookModel";
import {Link} from "react-router-dom";

export const CheckoutAndReviewBox: React.FC< { book: BookModel | undefined, mobile: boolean } >  = (props) => {
    return (
        // Container div with dynamic class name based on the `mobile` prop
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>0/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {/* Conditionally render whether the book is available or in wait list */}
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        {/* Display the number of book copies and available copies */}
                        <p className='col-6 lead'>
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {/* Link to sign in */}
                <Link to='/#' className='btn btn-success btn-lg'>Sign in</Link>
                <hr />
                {/* Additional information */}
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                <p>
                    Sign in to be able to leave a review.
                </p>
            </div>
        </div>
    );
}