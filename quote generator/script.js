// tying the html to JS 

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = []; // using let b/c we change value of this empty array with a quote

// Show Loading 
function loading() {
  loader.hidden = false; // We want loader to be visible 
  quoteContainer.hidden = true; // When no quote container (i.e page is loading), we will see load bar 
}

// Hide Loading 
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}


// Show New Quote 
function newQuote() {
  loading();
  // pick a random quote from API quotes array 
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field blank, and replace with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine styling 
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader 
  quoteText.textContent = quote.text;
  complete();
}

// Get quotes from API 
// asynchronous function - can run at anytime, independently. Wont stop the browser from completing the loading of the page

async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json"; //8261 quotes 
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json(); // getting json from API as a response. Turning response to a json object. then pass that to apiQuotes var
    console.log(apiQuotes)
    newQuote();
  } catch (error) {

    // catch error here. Production sites will typically spit-back message to user. 
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = ` https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank"); // Opens the linked document in a new window or tab
}

// Event Listeners to get buttons to work -- typically goes at button 
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
//loading();




// // If using local file i.e. quotes.js

// // Show New Quote
// function newQuote() {
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   console.log(quote);
// }

// // On Load
// newQuote();





// tweet function     https://twitter.com/intent/tweet

// Thoughts --
// Functions review
// lost at loader and logic behind getting that to work under certain conditions
