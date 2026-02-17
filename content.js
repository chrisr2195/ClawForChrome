// Function to grab the main text content of a page
function getPageContent() {
    const bodyText = document.body.innerText;
    // We send the text to the background.js
    chrome.runtime.sendMessage({
        type: "SEND_TO_CLAW",
        payload: {
            action: "analyze_page_content",
            text: bodyText.substring(0, 5000), // Limit to 5000 chars for performance
            url: window.location.href
        }
    });
}

// Listen for a specific trigger from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "SCRAPE_PAGE") {
        getPageContent();
        sendResponse({status: "Scraping started"});
    }
});
