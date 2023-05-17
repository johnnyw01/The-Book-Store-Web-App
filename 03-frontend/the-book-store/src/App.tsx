import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from "./Layouts/NavbarAndFooter/Navbar";
import {HomePage} from "./Layouts/Homepage/HomePage";
import {Footer} from "./Layouts/NavbarAndFooter/Footer";
import {SearchBooksPage} from "./Layouts/SearchBooksPage/SearchBooksPage";

function App() {
  return (
    <div className="App">
        <Navbar />
        {/*<HomePage />*/}
        <SearchBooksPage />
        <Footer />

    </div>
  );
}

export default App;
