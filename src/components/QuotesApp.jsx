import React, { useState } from 'react';
import './QuotesApp.css';

const QuotesApp = () => {
  const [quote, setQuote] = useState({
    text: 'Ask not what your country can do for you; ask what can you do for your country',
    author: 'John Kennedy',
  });

  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Fetch a new quote from the API
  const fetchNewQuote = async () => {
    const url =
      'https://thingproxy.freeboard.io/fetch/https://zenquotes.io/api/random';
    const response = await fetch(url);
    const data = await response.json();
    setQuote({
      text: data[0].q,
      author: data[0].a,
    });
  };

  // Toggle the visibility of the favorites
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  // Add the current quote to favorites if it isn't already there
  const addToFavorites = () => {
    const isAlreadyInFavorites = favorites.some(
      (fav) => fav.text === quote.text && fav.author === quote.author
    );

    // Only add the quote if it's not already in favorites
    if (!isAlreadyInFavorites) {
      setFavorites([...favorites, quote]);
    }
  };

  return (
    <div className="container">
      <div className="quotes-app">
        <h1 className="app-heading">Quotes.</h1>
        <i className="bx bxs-heart fav-icon" onClick={toggleFavorites}></i>
        <div className="quote">
          <i className="bx bxs-quote-alt-left left-quote"></i>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">{quote.author}</p>
          <i className="bx bxs-quote-alt-right right-quote"></i>
        </div>
        <div className="circles">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
        </div>
        <div className="buttons">
          <button className="btn btn-new" onClick={fetchNewQuote}>
            New Quote
          </button>
          <button className="btn btn-fav" onClick={addToFavorites}>
            Add to favourites
          </button>
        </div>
        {showFavorites && (
          <div className="favorites">
            <button className="btn-close" onClick={toggleFavorites}>
              <i className="bx bx-x"></i>
            </button>
            {favorites.map((favQuote, index) => (
              <div className="fav-quote" key={index}>
                <div
                  className="fav-quote-delete"
                  onClick={() => {
                    // Correctly filter to remove the selected favorite quote
                    const updatedFavorites = favorites.filter(
                      (_, i) => i !== index
                    );
                    setFavorites(updatedFavorites);
                  }}
                >
                  <i className="bx bx-x-circle"></i>
                </div>
                <div className="fav-quotes-content">
                  <div className="fav-quote-text">{favQuote.text}</div>
                  <div className="fav-quote-author">{favQuote.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesApp;
