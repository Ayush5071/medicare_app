# Medicare Web Application

Medicare is a web-based application designed to provide essential healthcare services including appointments, ambulance bookings, bed reservations, and pathology test requests. Built using EJS, MongoDB, and Express, this application allows users to access healthcare services seamlessly with authentication and dynamic content updates.

## Features

- **User Authentication:**  
  Users can register, log in, and view their profile details. Passport.js is used for local authentication.
  
- **Appointment Scheduling:**  
  Users can book appointments with doctors, and track the status of their appointments.

- **Bed Reservation:**  
  The application allows users to book hospital beds based on availability.

- **Ambulance Service:**  
  Users can request an ambulance by providing their details and address, which will be saved and processed.

- **Pathology Test Requests:**  
  Users can book pathology tests by providing necessary details such as the test type and personal information.

- **Profile Management:**  
  Users can update their profile pictures, view their appointments, bed bookings, ambulance requests, and pathology test statuses.

## Tech Stack

- **Backend:**  
  - Express.js (Server-side framework)
  - MongoDB (Database)
  - Mongoose (ODM for MongoDB)
  - Passport.js (Authentication)

- **Frontend:**  
  - EJS (Template engine for rendering dynamic views)
  - HTML, CSS (Styling)
  - JavaScript (Interactivity)

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/medicare.git
cd medicare
npm install
SESSION_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/medicare
npm start
