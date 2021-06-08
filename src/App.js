import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  // Store the clicked Category in a state variable
  let [chuckNorrisClickedCat, setChuckNorrisClickedCat] = useState("");
  // Once a Category link has been clicked:
  function clickChuckNorrisCategory(cat) {
    setChuckNorrisClickedCat(cat);
    getChuckNorrisQuoteByCat(cat);
  }
  // Reset the category state param to empty
  function resetCategory() {
    setChuckNorrisClickedCat("");
  }
  // Print a single Category link to the page, called from loop.
  let PrintLink = (props) => {
    return (
      <a
        href={"#" + props.cat}
        onClick={() => clickChuckNorrisCategory(props.cat)}
      >
        {props.cat.toUpperCase()}
      </a>
    );
  };
  // URL used to retreive random quote, will pass in category param elsewhere
  const categoryRandomQuoteUrl =
    "https://api.chucknorris.io/jokes/random?category=";
  // Set the random quote into a state variable
  let [categoryRandomQuote, setCategoryRandomQuote] = useState("");
  // Get the random quote by category
  const getChuckNorrisQuoteByCat = async (cat) => {
    const url = categoryRandomQuoteUrl + cat;
    const response = await fetch(url);
    const jsonData = await response.json();
    setCategoryRandomQuote(jsonData);
  };
  // Print the a random quote
  let PrintQuote = (props) => {
    return (
      <div>
        <img src={props.iconurl} alt="" className="floatL m-r-10" />
        {props.quote}
        <br />
        <br />
        <div className="clearfix"></div>
        <div className="floatL">
          <a
            href="#BackCategories"
            className="btn btn-primary"
            role="button"
            onClick={resetCategory}
          >
            Back to Categories
          </a>
        </div>
        <div className="floatR">
          <a
            href="#NextQuote"
            className="btn btn-primary"
            role="button"
            onClick={() => clickChuckNorrisCategory(chuckNorrisClickedCat)}
          >
            Next Quote
          </a>
        </div>
      </div>
    );
  };

  // Get all the Categories
  const [chuckNorrisCats, setChuckNorrisCats] = useState({});
  // useEffect to get the Categories
  useEffect(() => {
    getChuckNorrisCats();
  }, []);
  // This is the main Categories URL
  const categoryUrl = "https://api.chucknorris.io/jokes/categories";
  // Called to retreive the Categories through async fetch
  // The store data in a state variable: chuckNorrisCats
  const getChuckNorrisCats = async () => {
    const response = await fetch(categoryUrl);
    const jsonData = await response.json();
    setChuckNorrisCats(jsonData);
  };

  return (
    <div className="App">
      <h1>Welcome to Chuch Norris Quotes with React</h1>
      {!chuckNorrisClickedCat ? (
        <div className="categoryContainer">
          <ul className="list-group">
            {Object.keys(chuckNorrisCats).map((key) => (
              <li className="list-group-item" key={key}>
                <PrintLink key={key} cat={chuckNorrisCats[key]} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <PrintQuote
            iconurl={categoryRandomQuote.icon_url}
            quote={categoryRandomQuote.value}
          />
        </div>
      )}
    </div>
  );
}
