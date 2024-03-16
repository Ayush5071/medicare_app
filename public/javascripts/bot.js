document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
  
    // Function to add message to the chat
    function addMessage(message, sender) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.classList.add(sender);
      messageDiv.textContent = message;
      chatMessages.appendChild(messageDiv);
    }
  
    // Function to handle user input
    function handleUserInput() {
      const userMessage = userInput.value.trim();
      if (userMessage !== "") {
        addMessage(userMessage, "user");
        // Call function to process user input and generate bot response
        const botResponse = generateBotResponse(userMessage);
        addMessage(botResponse, "bot");
        // Clear user input field
        userInput.value = "";
      }
    }
  
    // Function to generate bot response based on user input
    function generateBotResponse(userMessage) {
        // Define an array of greetings
        const greetings = ["hello", "hi", "hey", "howdy"];
      
        // Check if any of the greetings are present in the user's message
        if (greetings.some(keyword => userMessage.toLowerCase().includes(keyword))) {
          return "Hello! How can I assist you today?";
        } else if (userMessage.toLowerCase().includes("appointment")) {
          return "Check your appointment status on Appointments option, and scroll down to Book an Appointment option for appointment booking ";
        } else if (userMessage.toLowerCase().includes("doctor")) {
          return "Sure, in which specialization you want a doctor";
        } else if (userMessage.toLowerCase().includes("bed")) {
          return "Check your bed booking status on Bed Booked option, and scroll down to Book a Bed option for bed booking ";
        } else if (userMessage.toLowerCase().includes("ambulance")) {
          return "Check your bed booking status on Ambulance Booked option, and scroll down to Book an Ambulance option for bed booking ";
        } else if (userMessage.toLowerCase().includes("visiting")) {
          return "Visiting hours are from 10:00 AM to 8:00 PM daily.";
        } else if (userMessage.toLowerCase().includes("billing")) {
          return "Certainly, our billing department can guide you through the procedures. Their no.:8786875872";
        } else if (userMessage.toLowerCase().includes("restrooms")) {
          return "Restrooms are down the hall to your left, and the cafeteria is on the ground floor near the main entrance.";
        } else if (userMessage.toLowerCase().includes("cafeteria")) {
          return "Restrooms are down the hall to your left, and the cafeteria is on the ground floor near the main entrance.";
        } else if (userMessage.toLowerCase().includes("wheelchair")) {
          return "We have wheelchair accessibility throughout the hospital.";
        } else if (userMessage.toLowerCase().includes("records")) {
          return "You can request medical records by filling out a form at the medical records department on the ground floor.";
        } else if (userMessage.toLowerCase().includes("paperwork")) {
          return "You can request medical records by filling out a form at the medical records department on the ground floor.";
        } else if (userMessage.toLowerCase().includes("parking")) {
          return "Visitor parking is available in the parking garage, and fees vary depending on the duration of parking.";
        } else if (userMessage.toLowerCase().includes("pharmacy")) {
          return "The nearest pharmacy is located just outside the hospital entrance to your right.";
        } else if (userMessage.toLowerCase().includes("safety")) {
          return "Please report any safety concerns to the nearest staff member or security personnel immediately";
        } else if (userMessage.toLowerCase().includes("wifi")) {
          return "We offer free WiFi access throughout the hospital, and there are comfortable waiting areas on each floor.";
        } else if (userMessage.toLowerCase().includes("bus")) {
          return "The nearest bus stop is located two blocks away from the hospital entrance.";
        } else if (userMessage.toLowerCase().includes("transportation")) {
          return "Transportation for discharged patients can be arranged through our discharge planning department";
        } else {
          return "I'm sorry, I didn't understand that. Please try again. Contact +44 54367682 for more details.";
        }
      }
  
    // Event listener for send button click
    sendBtn.addEventListener("click", handleUserInput);
  
    // Event listener for Enter key press in input field
    userInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        handleUserInput();
      }
    });
  
  });
