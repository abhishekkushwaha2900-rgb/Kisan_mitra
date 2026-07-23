async function sendMessage() {

    const input = document.getElementById("userInput");

    const message = input.value.trim();

    if (message === "") {
        return;
    }


    // User message screen par show karein
    addMessage(message, "user");

    // Input clear karein
    input.value = "";


    // Temporary loading message
    addMessage("AI Assistant soch raha hai... 🤔", "bot");


    try {

        // Flask Backend ko request bhejein
        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        // Flask ka response receive karein
        const data = await response.json();


        // Loading message remove karein
        const messages =
            document.getElementById("chatMessages");

        const lastMessage =
            messages.lastElementChild;

        lastMessage.remove();


        // AI response show karein
        addMessage(data.response, "bot");


    } catch (error) {

        console.error("Error:", error);

        addMessage(
            "माफ कीजिए, अभी server से connection नहीं हो पाया।",
            "bot"
        );

    }

}


function addMessage(message, sender) {

    const chatMessages =
        document.getElementById("chatMessages");


    const messageDiv =
        document.createElement("div");


    messageDiv.classList.add("message");


    if (sender === "user") {

        messageDiv.innerHTML = `

            <div class="message-icon">
                👨‍🌾
            </div>

            <div class="message-text">
                ${message}
            </div>

        `;

    } else {

        messageDiv.innerHTML = `

            <div class="message-icon">
                🤖
            </div>

            <div class="message-text">
                ${message}
            </div>

        `;

    }


    chatMessages.appendChild(messageDiv);


    // Latest message par scroll karein
    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


function sendQuickMessage(message) {

    document.getElementById("userInput").value =
        message;

    sendMessage();

}


function handleKeyPress(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}