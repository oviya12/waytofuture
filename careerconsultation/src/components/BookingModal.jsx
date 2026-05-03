import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function BookingModal({ isOpen, onClose, collegeName }) {
  const form = useRef();
  const [status, setStatus] = useState(""); // "sending", "success", "error"

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs.sendForm('service_9kaizv6', 'template_p2017ma', form.current, 'NlLC1GRuY9fMrFZme')
      .then(() => {
        setStatus("success");
        setTimeout(() => { onClose(); setStatus(""); }, 3000);
      }, () => {
        setStatus("error");
      });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '450px' }}>
        <button onClick={onClose} className="close-btn">✕</button>
        
        <h2>Book Expert Guidance</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px' }}>📍 Tamil Nadu & Abroad Admission Support</p>

        {status === "success" ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h3 style={{ color: '#4ECDC4' }}>Submission Successful!</h3>
            <p>Our experts will call you shortly.</p>
          </div>
        ) : (
          <form ref={form} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Input name is now 'name' to match {{name}} */}
            <input className="fi" name="name" placeholder="Full Name" required />
            <input className="fi" name="phone" placeholder="Phone Number" required />
            
            <select className="fi" name="degree" required>
              <option value="">Select Degree Inquiry</option>
              <option value="Engineering">Engineering</option>
              <option value="MBBS">MBBS</option>
              <option value="Arts & Science">Arts & Science</option>
            </select>
            
            <input className="fi" name="preferred_college" defaultValue={collegeName} placeholder="Preferred College" />
            <textarea className="fi" name="message" placeholder="Any specific questions?" rows="3" />
            
            {/* Hidden input to automatically record submission time */}
            <input type="hidden" name="time" value={new Date().toLocaleString()} />
            
            <button className="btn-p" type="submit">
              {status === "sending" ? "Sending..." : "Confirm Booking →"}
            </button>
            {status === "error" && <p style={{ color: 'red', fontSize: '0.8rem' }}>Error sending email. Try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
}