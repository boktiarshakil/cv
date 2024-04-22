// ==UserScript==
// @name           Cycling Quote Popups (Dismissible)
// @namespace    https://tampermonkey.net/
// @version      0.5
// @description  Displays quotes in cycle on every page load in a full-size popup container
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
  // Define your quotes here, separated by commas
  const quotes = "


1|1|শুরু করছি আল্লাহর নামে যিনি পরম করুণাময় অতি দয়ালু।,1|2|যাবতীয় প্রশংসা আল্লাহ তাâ€™আলার যিনি সকল সৃষ্টি জগতের পালনকর্তা।,1|3|যিনি নিতান্ত মেহেরবান ও দয়ালু।




";

  let currentQuoteIndex = 0; // Keeps track of the current quote index

  // Function to get the next quote in cycle
  function getNextQuote() {
    const quotesArray = quotes.split(",");
    currentQuoteIndex = (currentQuoteIndex + 1) % quotesArray.length; // Cycle through quotes
    return quotesArray[currentQuoteIndex].trim();
  }

  // Create the popup container and quote element (same as before)
  const popupContainer = document.createElement("div");
  popupContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; /* Use vh for full viewport height */
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: pointer; /* Add cursor pointer to indicate clickability */
  `;
  const quoteElement = document.createElement("p");
  quoteElement.style.cssText = `
    font-size: 20px;
    font-family: Arial, sans-serif;
    color: #fff;
  `;

  // Add click event listener to close popup
  popupContainer.addEventListener("click", () => {
    popupContainer.remove();
  });

  function showPopup() {
    const quote = getNextQuote();
    quoteElement.textContent = quote;
    popupContainer.appendChild(quoteElement);
    document.body.appendChild(popupContainer);
  }

  // Show popup on every page load
  window.addEventListener("load", showPopup);

  // Store the current quote index in localStorage (optional)
  if (typeof localStorage !== "undefined") {
    const storedIndex = localStorage.getItem("currentQuoteIndex");
    if (storedIndex) {
      currentQuoteIndex = parseInt(storedIndex);
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("currentQuoteIndex", currentQuoteIndex);
    });
  }
})();