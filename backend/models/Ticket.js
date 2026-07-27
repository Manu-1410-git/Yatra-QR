const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  fare: { type: Number, required: true },
  issueDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'Used'], default: 'Active' }
});

module.exports = mongoose.model('Ticket', ticketSchema);
