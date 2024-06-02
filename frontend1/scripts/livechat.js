// Initialize live chat functionality
$(document).ready(function() {
    // Function to open modal for live chat
    function openLiveChatModal() {
        $('#liveChatModal').modal('show');
        // Immediately send initial message with options when chat window is opened
        const initialMessage = "Hi! How can I assist you today?\n1. Book a room\n2. Explore amenities\n3. Get assistance\n4. Room service\n5. Local attractions\n6. Dining options\n7. Transportation\n8. Special requests\n9. Billing inquiries\n10. Other";
        appendBotMessage("Bot: " + initialMessage);
    }

    // Function to handle user input
    $('#chatInput').keypress(function(event) {
        if (event.which === 13) { // Enter key pressed
            const userInput = $('#chatInput').val();
            appendUserMessage(userInput);
            // If the user input is a number, treat it as an option selection
            if (!isNaN(userInput) && parseInt(userInput) >= 1 && parseInt(userInput) <= 10) {
                handleOptionSelection(parseInt(userInput));
            } else {
                appendBotMessage("Bot: I'm sorry, please select a valid option (1-10).");
            }
            $('#chatInput').val('');
        }
    });

    // Function to handle option selection
    function handleOptionSelection(option) {
        switch (option) {
            case 1:
                // Handle room booking option
                appendBotMessage("Bot: Please provide your check-in and check-out dates.");
                break;
            case 2:
                // Handle explore amenities option
                appendBotMessage("Bot: Our hotel offers various amenities such as swimming pool, gym, and spa.");
                break;
            case 3:
                // Handle get assistance option
                appendBotMessage("Bot: Please describe how I can assist you.");
                break;
            case 4:
                // Handle room service option
                appendBotMessage("Bot: Our room service menu includes a variety of delicious options. What would you like to order?");
                break;
            case 5:
                // Handle local attractions option
                appendBotMessage("Bot: Here are some popular local attractions near our hotel: [List of attractions]");
                break;
            case 6:
                // Handle dining options option
                appendBotMessage("Bot: We have multiple dining options available, including our on-site restaurant and room service. What type of cuisine are you interested in?");
                break;
            case 7:
                // Handle transportation option
                appendBotMessage("Bot: We can arrange transportation for you. Where would you like to go?");
                break;
            case 8:
                // Handle special requests option
                appendBotMessage("Bot: Please let us know your special requests, and we will do our best to accommodate them.");
                break;
            case 9:
                // Handle billing inquiries option
                appendBotMessage("Bot: For billing inquiries, please contact our front desk during business hours.");
                break;
            case 10:
                // Handle other option
                appendBotMessage("Bot: Please provide more details about how I can assist you.");
                break;
            default:
                appendBotMessage("Bot: I'm sorry, that's not a valid option.");
        }
    }

    // Function to append a user message to the chat window
    function appendUserMessage(message) {
        const timestamp = getCurrentTimestamp();
        const messageHtml = `<div class="message user-message">${message}<span class="timestamp">${timestamp}</span></div>`;
        $('#chatMessages').append(messageHtml);
        scrollChatToBottom();
    }

    // Function to append a bot message to the chat window
    function appendBotMessage(message) {
        const timestamp = getCurrentTimestamp();
        const messageHtml = `<div class="message bot-message">${message}<span class="timestamp">${timestamp}</span></div>`;
        $('#chatMessages').append(messageHtml);
        scrollChatToBottom();
    }

    // Function to get current timestamp
    function getCurrentTimestamp() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Function to scroll the chat window to the bottom with animation
    function scrollChatToBottom() {
        $('#chatMessages').animate({ scrollTop: $('#chatMessages').prop('scrollHeight') }, 500);
    }

    // Event listener for live chat button click
    $('#liveChatButton').click(function() {
        // Open modal for live chat
        openLiveChatModal();
    });
});
