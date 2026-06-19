# ShaiGPT

AI Chat Application built with React, TypeScript, FastAPI, MySQL, and OpenAI API.

## Developer

Shai Akoka

---

## Project Description

ShaiGPT is a full-stack AI chat application that allows users to communicate with an AI assistant, continue conversations within the same context, start new conversations, and store chat history in a MySQL database.

---

## Technologies

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- FastAPI
- Python
- SQLAlchemy
- Uvicorn

### Database

- MySQL

### AI

- OpenAI API

---

## Features

- Chat with AI assistant
- Continue conversations with context
- Start new conversations
- Store conversations in database
- Store messages in database
- Responsive user interface

---

## GitHub Repository

https://github.com/shaiuy/shaigptproject.git

---

## Running the Project

### Backend

Navigate to the Backend folder:

cd Backend

Install dependencies:

pip install -r requirements.txt

Run the FastAPI server:

uvicorn src.app:app --reload

Backend URL:

http://localhost:8000

---

### Frontend

Navigate to the Frontend folder:

cd Frontend

Install dependencies:

npm install

Run the React application:

npm start

Frontend URL:

http://localhost:5173

---

## Database Setup

Create a MySQL database named:

CREATE DATABASE chat_project;

Import the database dump file:

mysql -u root -p chat_project < chat_project.sql

After the import is completed, the following tables will be available:

- conversations
- messages

The database stores:

- Conversation IDs
- Message content
- Sender role (user / assistant)
- Creation timestamps

---

## Requirements

- Node.js
- Python 3.x
- MySQL
- OpenAI API Key
