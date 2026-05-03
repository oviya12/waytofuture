import React from 'react';

export default function AdmissionModal({ college, onClose, onBookClick }) {
  if (!college) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <button onClick={onClose} className="close-btn" style={{ position: 'sticky', top: '10px', float: 'right', zIndex: 10 }}>✕</button>
        
        <div style={{ marginBottom: '20px' }}>
          <span style={{ color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>{college.zone}</span>
          <h2 style={{ fontSize: '1.5rem', marginTop: '5px' }}>{college.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📍 {college.location}</p>
        </div>

        <div className="modal-scroll-area" style={{ maxHeight: '60vh', overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
          {college.fees.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '30px' }}>
              <h4 style={{ color: 'var(--accent)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '5px' }}>{section.school}</h4>
              <table className="fees-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    {section.rows[0]?.cols.map((col, i) => col && <th key={i}>{col}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{row.course}</td>
                      {row.values.map((val, vi) => <td key={vi} style={{ color: 'var(--accent)' }}>{val}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Need direct admission guidance?
          </div>
          <button className="btn-p" onClick={onBookClick}>Book Guidance Session</button>
        </div>
      </div>
    </div>
  );
}