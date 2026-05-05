import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const servicesList = [
  {
    title: 'Engineering Guidance',
    icon: '⚙️',
    description: 'Comprehensive choices for TNEA, deemed universities, and management quota programs with cutoff and fee structure guidance.',
    inquiry: 'Engineering',
  },
  {
    title: 'Medical Guidance',
    icon: '⚕️',
    description: 'Expert counseling for MBBS, BDS, and AYUSH admissions including national, state, and abroad seat planning.',
    inquiry: 'MBBS',
  },
  {
    title: 'Arts & Science Guidance',
    icon: '🎨',
    description: 'Admissions support for BBA, B.Com, and science/computer application courses at top-tier colleges.',
    inquiry: 'Arts & Science',
  },
  {
    title: 'Abroad Admission Support',
    icon: '✈️',
    description: 'Guidance for study abroad applications, visa counseling, and program selection for international universities.',
    inquiry: 'Abroad',
  },
];

export default function Services() {
  const formRef = useRef(null);
  const [expandedService, setExpandedService] = useState(servicesList[0].inquiry);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Engineering',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSelectService = (serviceType) => {
    setFormData((prev) => ({ ...prev, serviceType }));
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const toggleService = (serviceType) => {
    setExpandedService((prev) => (prev === serviceType ? null : serviceType));
    setFormData((prev) => ({ ...prev, serviceType }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('sending');

    emailjs.send('service_9kaizv6', 'template_p2017ma', {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      degree: formData.serviceType,
      message: formData.message,
      time: new Date().toLocaleString(),
    }, 'NlLC1GRuY9fMrFZme')
      .then(() => {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', serviceType: formData.serviceType, message: '' });
        setTimeout(() => setStatus(''), 4000);
      }, () => {
        setStatus('error');
      });
  };

  return (
    <div className="services-page" style={{ minHeight: '85svh', maxWidth: '1280px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '3.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '20px' }}>
        Our <span style={{ color: 'var(--accent)' }}>Services</span>
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 60px', fontSize: '1.05rem' }}>
        Secure your future through tailored roadmaps and expert admission counseling. Select your path below to get started.
      </p>

      <div className="services-grid" style={{ marginBottom: '60px' }}>
        {servicesList.map((service) => (
          <div key={service.title} className={`service-card ${expandedService === service.inquiry ? 'expanded' : ''}`}>
            <button type="button" className="service-toggle" onClick={() => toggleService(service.inquiry)}>
              <div className="service-icon">{service.icon}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 700, marginBottom: '6px' }}>{service.title}</h3>
                <p className="service-summary" style={{ margin: 0, color: 'var(--text-muted)' }}>{service.description}</p>
              </div>
              <span className="service-chevron">{expandedService === service.inquiry ? '−' : '+'}</span>
            </button>

            <div className="service-details">
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>{service.description}</p>
              <button className="btn-p" style={{ width: '100%' }} onClick={() => handleSelectService(service.inquiry)}>
                Get Guidance
              </button>
            </div>
          </div>
        ))}
      </div>

      <div ref={formRef} style={{ background: 'var(--nav-bg)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: '0 18px 50px rgba(0,0,0,0.12)' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>Book a Free Guidance Session</h3>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
          Fill out the form below to schedule a free counseling session with our admission experts.
        </p>

        {status === 'success' ? (
          <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(78, 204, 196, 0.12)', color: '#0b3b34', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '10px' }}>Submitted successfully!</h4>
            <p>Our team will contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px' }}>
            <input className="fi" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input className="fi" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input className="fi" name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <select className="fi" name="serviceType" value={formData.serviceType} onChange={handleChange} required>
              {servicesList.map((service) => (
                <option key={service.inquiry} value={service.inquiry}>{service.title}</option>
              ))}
            </select>
            <textarea className="fi" name="message" placeholder="Your questions / goals" rows="4" value={formData.message} onChange={handleChange} style={{ gridColumn: '1 / -1' }} />
            <button className="btn-p" type="submit" style={{ gridColumn: '1 / -1', padding: '16px 24px' }}>
              {status === 'sending' ? 'Sending...' : 'Submit Booking Request'}
            </button>
            {status === 'error' && <p style={{ gridColumn: '1 / -1', color: '#ff6b6b', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
}
