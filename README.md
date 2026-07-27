# YatraQR - Indian Bus QR Ticketing & Conductor Validator System

Final Year Project - Full Stack MERN Transit Solution.

## 🚀 How to Run for Presentation (Zero Setup Required)

### 1. Start the Backend API (Port 5000)
Open a terminal and run:
```bash
cd backend
npm install
npm start
```
*(Note: If MongoDB is installed locally on port 27017 it connects automatically. If not, it runs seamlessly in Zero-Config In-Memory Mode!)*

### 2. Start the Frontend Application (Port 5173)
Open a second terminal and run:
```bash
cd frontend
npm install
npm run dev
```

Open **`http://localhost:5173`** in your web browser!

---

## 🌟 Key Features Built for Presentation
1. **Passenger Booking**: Choose from popular Indian bus stops (Delhi, Mumbai, Bengaluru, Kolkata), calculate live fares (₹10 - ₹40), and generate instant downloadable high-res QR Tickets.
2. **Conductor Scanner**: 
   - Live Webcam QR Scanner.
   - Manual Ticket ID fallback (e.g. `IND-883921`) so you can test and present even without a camera!
   - Real-time validity checks (**VALID** green card vs **ALREADY USED** red card).
3. **Admin Dashboard**: Live system analytics, total revenue counters, and real-time ticket logs.
