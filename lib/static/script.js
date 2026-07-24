async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message === "") return;

    // User message show
    addMessage(message, "user");

    // Clear input
    input.value = "";

    // Loading message
    addMessage("AI Assistant सोच रहा है... 🤔", "bot");

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Remove loading message
        const chatMessages = document.getElementById("chatMessages");
        chatMessages.removeChild(chatMessages.lastElementChild);

        // AI reply
        addMessage(data.reply, "bot");

    } catch (error) {
        console.error(error);

        const chatMessages = document.getElementById("chatMessages");
        if (chatMessages.lastElementChild) {
            chatMessages.removeChild(chatMessages.lastElementChild);
        }

        addMessage("❌ Server se connection nahi ho paya.", "bot");
    }
}

function addMessage(message, sender) {
    const chatMessages = document.getElementById("chatMessages");

    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + sender;

    messageDiv.innerHTML = `
        <div class="message-icon">
            ${sender === "user" ? "👨‍🌾" : "🤖"}
        </div>
        <div class="message-text">
            ${message}
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendQuickMessage(message) {
    document.getElementById("userInput").value = message;
    sendMessage();
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}