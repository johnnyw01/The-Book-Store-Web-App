import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from "./Layouts/NavbarAndFooter/Navbar";
import {HomePage} from "./Layouts/Homepage/HomePage";
import {Footer} from "./Layouts/NavbarAndFooter/Footer";
import {SearchBooksPage} from "./Layouts/SearchBooksPage/SearchBooksPage";
import {Redirect, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home">
                    <HomePage/>
                </Route>
                <Route path="/search">
                    <SearchBooksPage/>
                </Route>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
