# 🎲 Gacha Stats Pro

A full-stack MERN web application designed to simulate loot box mechanics and visualize the underlying probability, statistics, and Expected Value (EV) of digital reward systems.

## 🚀 Overview

Gacha Stats Pro isn't just a game; it's a statistical simulation. Players are given exactly 100 pulls to test their luck against a mathematically rigorous "House Edge." The application tracks global player performance, calculates the Net Expected Value of every session, and ranks players on a live database-driven leaderboard. 

### 🛠️ Tech Stack
* **Frontend:** React (Vite), Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose (Strict MVC Architecture)

### ✨ Key Features
* **Expected Value Math Engine:** Calculates player scores based on continuous probability distributions and weighted drop rates (Legendary to Common).
* **Strict Data Validation:** Utilizes Mongoose Enums and schemas to ensure absolute data integrity before writing to the database.
* **Global Leaderboard:** Fetches and sorts the top 100 players in real-time using secure REST API endpoints.
* **Upsert Logic:** Backend intelligently recognizes returning players, updating their cumulative inventory while only overwriting their high score if they beat their personal best.

---

## 💻 How to Run Locally

If you want to run this simulation on your own machine, follow these steps:

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/DhruvD0202/gacha-stats-pro.git
cd gacha-stats-pro
\`\`\`

### 2. Setup the Backend
Open a terminal and navigate to the backend folder:
\`\`\`bash
cd backend
npm install
\`\`\`
* Create a `.env` file in the `backend` folder and add your MongoDB connection string:
  \`MONGO_URI=your_mongodb_connection_string_here\`
  \`PORT=5000\`
* Start the server:
\`\`\`bash
node server.js
\`\`\`

### 3. Setup the Frontend
Open a **second** terminal and navigate to the frontend folder:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
* Open your browser and go to `http://localhost:5173` to start pulling!
