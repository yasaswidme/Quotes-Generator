//   fetch = Function used for making HTTP requests to fetch resources.
//   (JSON style DataTransfer, images ,files)
//   Simplifies asynchronous data fetching in JavaScript and 
//   used for interacting with APIs to retrieve and send 
//   data asychronously over the web.
//   fetch(url , {options})
// function getGitHubUser(username){
//     const url = `https://api.github.com/users/${username}`;
//     fetch(url)
//        .then(response => {
//             if(response.ok){
//                 return response.json();
//             };
//        })
//        .then(userData => {
//             console.log("User data:" ,userData);
//        })
//        .catch(error => {
//             console.log("Error fetching user:",error);
//        });        };

// getGitHubUser("Sivabrahma");

let currentQuoteIndex = 0;
let quotesData = [];

// Fetch data from the API and store it in the quotesData array
async function fetchData() {
    try {
        const response = await fetch("https://jacintodesign.github.io/quotes-api/data/quotes.json");

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        quotesData = await response.json(); // Store all quotes in a variable

        // Initially show the first quote
        updateQuote();

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

// Function to update the displayed quote and author
function updateQuote() {
    if (quotesData.length > 0) {
        // Get the current quote and author
        const text = quotesData[currentQuoteIndex].text;
        const author = quotesData[currentQuoteIndex].author;

        // Update the DOM elements
        const quotesElement = document.getElementById("quotes");
        const authorElement = document.getElementById("author");

        // Add a fade-in effect for quotes
        quotesElement.style.opacity = 0;
        authorElement.style.opacity = 0;

        setTimeout(() => {
            quotesElement.innerText = `"${text}"`;
            authorElement.innerText = `— ${author}`;

            // Fade-in animation after updating the content
            quotesElement.style.opacity = 1;
            authorElement.style.opacity = 1;
        }, 200);

        // Move to the next quote, and loop back to the first quote after reaching the end
        currentQuoteIndex = (currentQuoteIndex + 1) % quotesData.length;
    }
}

// Call fetchData to load and display the first quote when the page is loaded
fetchData();

// Button will call updateQuote to show the next quote
document.getElementById("nextButton").addEventListener("click", updateQuote);

    