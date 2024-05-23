Hotel Management System 
This repository contains the backend code for a hotel management system. It provides API endpoints for managing rooms and users.

Prerequisites
Before running the application, make sure you have the following installed on your system:

Node.js (v14.x or higher)
npm (Node Package Manager)

Installation

Clone this repository to your local machine:
git clone https://github.com/KanmegneTabouguie/HotemManagementMvp

Navigate to the project directory:
cd backend

Install dependencies:
npm install

Running the Application
To start the backend server, follow these steps:

Make sure you're in the project directory.

Start the server:
node index.js
This will start the server at http://localhost:3067.

You should see a message indicating that the server is running.

API Documentation
For details on the available API endpoints and how to use them, refer to the API Endpoint Documentation file.

## Usage

To interact with the API endpoints, you can use tools like cURL, Postman, or your preferred HTTP client library in your preferred programming language. Here's an example using cURL to retrieve all rooms:

curl http://localhost:3067/rooms

Alternatively, you can navigate to the frontend folder and open the components using a live server. 
You can use the register HTML page to create an account as a guest or use the admin account details to access the admin dashboard.
credential admin :
 "email": "admin@example.com",
    "password": "adminPassword"