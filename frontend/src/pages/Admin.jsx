import React, { useState, useEffect } from 'react';
import { TrendingUp, Ticket, CheckCircle, ShieldCheck } from 'lucide-react';

const Admin = () => {
  const [stats, setStats] = useState({
    totalTickets: 12,
    activeTickets: 8,
    usedTickets: 4,
    totalRevenue: 280,
    recentTickets: []
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/tickets/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldCheck color="#34D399" size={24} /> Admin Transit Dashboard
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL REVENUE</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399', marginTop: '4px' }}>₹{stats.totalRevenue}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ISSUED TICKETS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#A5B4FC', marginTop: '4px' }}>{stats.totalTickets}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 700 }}>VALIDATED (USED)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399', marginTop: '2px' }}>{stats.usedTickets}</div>
        </div>

        <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <span style={{ fontSize: '0.75rem', color: '#A5B4FC', fontWeight: 700 }}>ACTIVE (UNScanner)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#A5B4FC', marginTop: '2px' }}>{stats.activeTickets}</div>
        </div>
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: '#CBD5E1' }}>
        Live System Logs
      </h3>

      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '14px', padding: '12px', fontSize: '0.8rem' }}>
        <div style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#34D399' }}>
          ✓ Ticket IND-492012 marked as USED by Conductor
        </div>
        <div style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#A5B4FC' }}>
          + New Ticket IND-883921 issued for ₹15
        </div>
        <div style={{ padding: '8px 0', color: '#94A3B8' }}>
          System initialized in Zero-Config Hybrid Mode
        </div>
      </div>
    </div>
  );
};

export default Admin;
