document.getElementById('sendUrl').onclick = async () => {
    // Get the currently active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Send the tab info to the background script
    chrome.runtime.sendMessage({
        type: "SEND_TO_CLAW",
        payload: {
            action: "process_url",
            url: tab.url,
            title: tab.title
        }
    }, (response) => {
        if (response && response.status === "sent") {
            console.log("Data successfully relayed to OpenClaw.");
        }
    });


};

document.getElementById('scrapeBtn').onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Tell the content script to start scraping
    chrome.tabs.sendMessage(tab.id, { action: "SCRAPE_PAGE" });
};
