import { useState, useEffect } from "react";
import twitterLogo from "./assets/twitter.svg";
import "./App.css";

function App() {
  const [quotue, setQuotue] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if(quotue === ""){
      getQuotue();
    }
    randomColor();
  }, [quotue]);
    

  function randomColor() {
    const colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
      "#F49AC2",
      "#F5B041",
    ];

    const random = Math.floor(Math.random() * colors.length);
    document.getElementById("container").style.backgroundColor = colors[random];
    document.getElementById("author").style.color = colors[random];
    document.getElementById("text").style.color = colors[random];
    document.getElementById("new-quote").style.backgroundColor = colors[random];
    document.getElementById("tweet-quote").style.backgroundColor = colors[random];
    document.getElementById("huge").style.color = colors[random];

  }

  async function getQuotue() {
    const response = await fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((response) => {
        const random = Math.floor(Math.random() * response.length);
        setQuotue(response[random].text);
        setAuthor(
          response[random].author ? response[random].author : "Unknown"
        );
      });
  }

  function postTweet() {
    const tweet = `https://twitter.com/intent/tweet?text="${quotue}" - ${author}`;
    window.open(tweet, "_blank");
  }

  return (
    <div id="container">
      <div id="quote-box">
        <div id="text">
          <span id="huge"></span>
          "{quotue}"
        </div>
        <div id="author">- {author}</div>
        <div className="buttons">
          <a
            id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            target="_blank"
            onClick={postTweet}
          >
             <img src={twitterLogo} className="logo" alt="twitter" />
          </a>
          <button id="new-quote" onClick={getQuotue}>
            New quotue
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
