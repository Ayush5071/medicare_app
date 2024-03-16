document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
  
    function addMessage(message, sender) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.classList.add(sender);
      messageDiv.textContent = message;
      chatMessages.appendChild(messageDiv);
    }
  
    function handleUserInput() {
      const userMessage = userInput.value.trim();
      if (userMessage !== "") {
        addMessage(userMessage, "user");
        const botResponse = generateBotResponse(userMessage);
        addMessage(botResponse, "bot");
        userInput.value = "";
      }
    }
  

    function generateBotResponse(userMessage) {

        const greetings = ["hello", "hi", "hey", "howdy"];
      
      
        if (greetings.some(keyword => userMessage.toLowerCase().includes(keyword))) {
          return "Hello! How can I assist you today?";
        } else if (userMessage.toLowerCase().includes("product")) {
          return "Sure, what type of product are you looking for?";
        } else if (userMessage.toLowerCase().includes("doctor")) {
          return "Sure,which specialist are you looking for?";
        } else {
          return "I'm sorry, I didn't understand that. Please try again.";
        }
      }
  

    sendBtn.addEventListener("click", handleUserInput);

    userInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        handleUserInput();
      }
    });
  
  });