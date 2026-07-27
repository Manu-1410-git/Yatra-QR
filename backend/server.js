const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global memory DB for instant presentation execution without setup
global.ticketsDb = [
  {
    _id: 'IND-883921',
    ticketId: 'IND-883921',
    source: 'Connaught Place (Delhi)',
    destination: 'Red Fort (Delhi)',
    fare: 15,
    issueDate: new Date().toISOString(),
    status: 'Active'
  },
  {
    _id: 'IND-492012',
    ticketId: 'IND-492012',
    source: 'Andheri West (Mumbai)',
    destination: 'Bandra Station (Mumbai)',
    fare: 25,
    issueDate: new Date().toISOString(),
    status: 'Used'
  }
];

app.use(cors());
app.use(express.json());

// Ticket routes
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

// Optional MongoDB Connection
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/qrbus';
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('Notice: MongoDB not detected on port 27017. Running in Zero-Config In-Memory Mode!'));

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 QR Bus Validator API running on http://localhost:${PORT}`);
  console.log(`===============================================`);
});
