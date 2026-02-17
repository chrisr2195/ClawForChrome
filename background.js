let socket = null;

function connectToOpenClaw() {
    // Assuming OpenClaw/Moltbot is hosting a WebSocket server on port 8080
    socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => console.log("Connected to OpenClaw");
    
    socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log("Command received from OpenClaw:", msg);
        
        // Example: OpenClaw commands the browser to open a specific tab
        if (msg.action === "open_tab") {
            chrome.tabs.create({ url: msg.url });
        }
    };

    socket.onclose = () => {
        console.log("Connection lost. Retrying in 5s...");
        setTimeout(connectToOpenClaw, 5000);
    };
}

connectToOpenClaw();

// Listen for messages from the popup and forward them to OpenClaw
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "SEND_TO_CLAW" && socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(request.payload));
        sendResponse({status: "sent"});
    }
});
