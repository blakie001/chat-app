# Chat Application

A real-time chat application built with ReactJS (frontend) and Node.js/ExpressJS (backend) using Socket.IO for real-time communication. The application supports one-to-one messaging, real-time status updates, offline indicators, and typing notifications.

## Features
- User Authentication (Login/Register with JWT)
- One-to-One Messaging
- Real-Time Communication with Socket.IO
- Typing Indicator
- Offline/Online Status
- Secure Backend with ExpressJS

## Technologies Used
### Frontend
- ReactJS
- React Hooks
- React Router
- Socket.IO Client

### Backend
- Node.js
- ExpressJS
- Socket.IO Server
- JWT Authentication
- MongoDB (for storing users and messages)
- Mongoose (MongoDB ORM)

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Backend Setup
```sh
cd backend
npm install
```
#### Configure Environment Variables
Create a `.env` file in the `backend` directory with the following content:
```env
PORT=3000
MONGO_URI=mongodb+srv://khushank_arora:myPassword@assignment.fyk82ea.mongodb.net/
JWT_SECRET=token@khushank
```
#### Start the Backend Server
```sh
npm start
```
The backend will run on `http://localhost:3000`

### 3. Frontend Setup
```sh
cd ../frontend
npm install
```
#### Start the Frontend
```sh
npm run dev
```
The frontend will run on `http://localhost:5173`

## Running the Project from Scratch
1. Ensure you have **Node.js** and **MongoDB** installed.
2. Clone the repository and navigate into the project.
3. Install dependencies for both backend and frontend.
4. Start the backend (`npm start` in `/backend`).
5. Start the frontend (`npm run dev` in `/frontend`).
6. Open `http://localhost:5173` in your browser and start chatting!

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Messages
- `POST /api/messages/send` - Send a message
- `GET /api/messages/:conversationId` - Get chat history

### Users
- `GET /api/users` - Get list of users
- `GET /api/users/:id` - Get user details

## WebSocket Events
### Client to Server
- `sendMessage` - Send a new message
- `userTyping` - Notify when a user is typing
- `disconnect` - Notify when a user goes offline

### Server to Client
- `messageReceived` - Notify when a new message arrives
- `typing` - Show typing indicator
- `userOnline` / `userOffline` - Update user status
