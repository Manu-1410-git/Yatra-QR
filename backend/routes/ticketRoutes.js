const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Book a ticket
router.post('/book', async (req, res) => {
  try {
    const { source, destination, fare } = req.body;
    
    if (!source || !destination || !fare) {
      return res.status(400).json({ error: 'Please select source, destination, and valid fare' });
    }

    const ticketId = 'IND-' + Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      _id: ticketId,
      ticketId,
      source,
      destination,
      fare: Number(fare),
      issueDate: new Date().toISOString(),
      status: 'Active'
    };

    // Store in global in-memory database
    global.ticketsDb.push(newTicket);

    // Attempt Mongo save if available
    try {
      const dbTicket = new Ticket({ ticketId, source, destination, fare });
      await dbTicket.save();
    } catch (e) {}

    const qrPayload = JSON.stringify({ ticketId: newTicket.ticketId });

    res.status(201).json({
      message: 'Ticket booked successfully!',
      ticket: newTicket,
      qrPayload
    });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ error: 'Server error while booking ticket' });
  }
});

// Validate ticket by QR Payload or Ticket ID
router.post('/validate', async (req, res) => {
  try {
    const { qrPayload, manualTicketId } = req.body;
    let targetTicketId = manualTicketId;

    if (qrPayload) {
      try {
        const parsed = JSON.parse(qrPayload);
        targetTicketId = parsed.ticketId || parsed.id || qrPayload;
      } catch (e) {
        targetTicketId = qrPayload;
      }
    }

    if (!targetTicketId) {
      return res.status(400).json({ error: 'Please provide a valid QR code or Ticket ID' });
    }

    // Search in-memory store
    let ticket = global.ticketsDb.find(t => t.ticketId === targetTicketId || t._id === targetTicketId);

    // Fallback Mongo search
    if (!ticket) {
      try {
        const mongoTicket = await Ticket.findOne({ ticketId: targetTicketId });
        if (mongoTicket) ticket = mongoTicket;
      } catch (e) {}
    }

    if (!ticket) {
      return res.status(404).json({ error: 'INVALID TICKET! No record found in database.' });
    }

    if (ticket.status === 'Used') {
      return res.status(400).json({ 
        error: 'ALREADY USED TICKET!', 
        details: `This ticket was already validated at ${new Date(ticket.usedAt || Date.now()).toLocaleTimeString()}`
      });
    }

    // Mark as Used
    ticket.status = 'Used';
    ticket.usedAt = new Date().toISOString();

    res.json({
      message: 'VALID TICKET',
      ticket
    });
  } catch (error) {
    console.error('Error validating ticket:', error);
    res.status(500).json({ error: 'Server error during ticket validation' });
  }
});

// Get Stats for Admin Dashboard
router.get('/stats', (req, res) => {
  const totalTickets = global.ticketsDb.length;
  const activeTickets = global.ticketsDb.filter(t => t.status === 'Active').length;
  const usedTickets = global.ticketsDb.filter(t => t.status === 'Used').length;
  const totalRevenue = global.ticketsDb.reduce((sum, t) => sum + t.fare, 0);

  res.json({
    totalTickets,
    activeTickets,
    usedTickets,
    totalRevenue,
    recentTickets: global.ticketsDb.slice(-5).reverse()
  });
});

module.exports = router;
