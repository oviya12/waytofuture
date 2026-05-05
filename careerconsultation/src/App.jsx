import { useState, useEffect } from "react";
import SearchModule from "./components/SearchModule";
import AdmissionModal from "./components/AdmissionModal";
import BookingModal from "./components/BookingModal";
import Services from "./components/Services";
import emailjs from '@emailjs/browser';
import './App.css';

export default function App() {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [prefillCollege, setPrefillCollege] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [view, setView] = useState("home"); // "home" or "services"

  const CONTACT_NUMBER = "7094349494";
  const WHATSAPP_TEXT = encodeURIComponent("Hello Way2Future! I need admission guidance for Engineering/MBBS/Arts & Science.");

  // Carousel Images List
  const carouselImages = [
    "colstud2.jpg",
    "collegestud.jpg",
    "WhatsApp Image 2026-05-01 at 11.24.32 PM.jpeg",
    "WhatsApp Image 2026-05-01 at 11.22.45 PM.jpeg",
    "WhatsApp Image 2026-05-01 at 11.21.59 PM.jpeg",
    "WhatsApp Image 2026-05-01 at 11.21.34 PM.jpeg"
  ];

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

  const [expandedService, setExpandedService] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Engineering',
    message: '',
  });
  const [status, setStatus] = useState('');
  const handleBookSession = (collegeName = "") => {
    setPrefillCollege(collegeName);
    setBookingOpen(true);
  };

  const toggleService = (serviceType) => {
    setExpandedService((prev) => (prev === serviceType ? null : serviceType));
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

  // Set theme attribute on html tag
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle navbar scroll effect
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ─── AUTOMATIC CAROUSEL LOGIC ───
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const scrollTo = (id) => {
    setView("home");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Carousel Manual Nav Controls
  const nextSlide = () => setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div style={{ background: "var(--bg-color)", minHeight: "100vh", position: "relative" }}>
      <div className="noise" />

      {/* ─── CONTACT BAR ─── */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 105,
        background: "#142A55",
        borderBottom: "1px solid rgba(255,255,255,0.14)",
        padding: "8px 0"
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
          flexWrap: "wrap",
          padding: "0 20px",
          color: "#fff",
          fontSize: "0.88rem"
        }}>
          <span style={{ fontWeight: 700 }}>📞 +91-{CONTACT_NUMBER}, +91-7448996999</span>
          <span>WhatsApp us for quick guidance</span>
          <a href={`tel:${CONTACT_NUMBER}`} className="btn-p" style={{ padding: "6px 14px", background: "#1A6BFF", color: "#fff", textDecoration: "none", fontSize: "0.78rem" }}>Call Now</a>
          <a href={`https://wa.me/${CONTACT_NUMBER}?text=${WHATSAPP_TEXT}`} target="_blank" rel="noreferrer" className="btn-o" style={{ padding: "6px 14px", background: "#25D366", color: "#fff", textDecoration: "none", border: "1px solid rgba(37,211,102,0.36)", borderRadius: "6px", fontSize: "0.78rem" }}>WhatsApp</a>
        </div>
      </div>

      {/* ─── NAVIGATION ─── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ 
        position: "fixed", 
        top: "48px", 
        left: 0, right: 0, zIndex: 100, 
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        height: "auto", minHeight: "70px", display: "flex", flexWrap: "wrap", alignItems: "center", 
        justifyContent: "space-between", padding: "6px 5vw",
        transition: "all 0.4s ease", borderBottom: scrolled ? "1px solid var(--border)" : "none", gap: "12px"
      }}>
        
        <div style={{ paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "nowrap" }} className="nav-main-wrapper">
          
          {/* 1. Logo & Links */}
          <div className="hide-on-scroll nav-left" style={{ display: "flex", gap: 20 }}>
            <div className="nav-brand" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src="/waytofuture_logo.png"
                  alt="Way2Future logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <span className="logo-text" style={{ fontSize: "1.02rem", fontWeight: 700 }}>Way2Future</span>
               <div className="nav-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div className="hide-on-scroll" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button className="btn-p" style={{ padding: "8px 18px", fontSize: "0.85rem" }} onClick={() => handleBookSession()}>
                Enquire
              </button>

              <button onClick={toggleTheme} className="theme-toggle" style={{ width: "36px", height: "36px" }}>
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
            </div>
            
            <div className="nav-links" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <button onClick={() => setView("home")} className="nav-link" style={{ color: view === "home" ? "var(--accent)" : "var(--text-muted)" }}>
                Home
              </button>
              <button onClick={() => scrollTo("about")} className="nav-link">About Us</button>
              <button onClick={() => setView("services")} className="nav-link" style={{ color: view === "services" ? "var(--accent)" : "var(--text-muted)" }}>
                Services
              </button>
            </div>
          </div>
          

          {/* 2. CENTRE ATTENTION: SEARCHBAR */}
          <div style={{ flex: "1 1 280px", maxWidth: "360px", display: "flex", justifyContent: "center" }} className="nav-search-bar">
            <div style={{ width: "100%" }}>
              <SearchModule onSelectCollege={setSelectedCollege} />
            </div>
          </div>

          {/* 3. RIGHT ATTENTION: CONTROLS */}
         
        
        </div>
      </nav>

      {/* ─── PAGE ROUTING ─── */}
      {view === "services" ? (
        <Services />
      ) : (
        <section style={{ minHeight: "85svh", display: "flex", alignItems: "center", paddingTop: "200px", paddingBottom: "72px", paddingLeft: "5vw", paddingRight: "5vw" }}>
          <div className="responsive-hero-grid" style={{ width: "100%" }}>
            
            {/* Carousel moved to the top */}
            <div className="carousel-wrapper" style={{ width: "100%", maxWidth: "580px", margin: "0 auto" }}>
              <div style={{ 
                background: "var(--card-bg)", 
                borderRadius: "16px", 
                border: "1px solid var(--border)", 
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
              }}>
                <img 
                  src={`/${carouselImages[currentImage]}`} 
                  alt={`Slide ${currentImage + 1}`} 
                  className="carousel-img"
                  style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }} 
                  onError={(e) => {
                     e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* Dotted Slider Navigation */}
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "18px", alignItems: "center" }}>
                <button onClick={prevSlide} className="btn-o" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>◀</button>
                
                {carouselImages.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: currentImage === i ? "var(--accent)" : "var(--border)",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}

                <button onClick={nextSlide} className="btn-o" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>▶</button>
              </div>
            </div>

            {/* Hero text moved down */}
            <div style={{ maxWidth: 650, zIndex: 1 }}>
              <div className="context-badge">📍 College Admission Guidance — Tamil Nadu & Abroad</div>
              <h1 style={{ fontSize: "clamp(1.1rem, 3.5vw, 4.2rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
                Secure Your Seat in <br/>Top Universities
              </h1>
              <p style={{ fontSize: "1.15rem", fontWeight: 400, marginBottom: 24, color: "var(--text-main)" }}>
                📙 Engineering / 📙 MBBS / 📙 Arts & Science / 📙 & More
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 35, fontSize: "1.05rem", maxWidth: "600px" }}>
                Navigating admissions? We simplify your journey. Securing seats in top-tier 
                <strong> Engineering, MBBS,</strong> and <strong>Arts & Science</strong> programs 
                with expert guidance for TN and abroad institutions.
              </p>
              
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <button className="btn-p" style={{padding: '14px 30px', fontSize: '0.95rem'}} onClick={() => handleBookSession()}>Book Free Guidance Session</button>
                <button onClick={() => scrollTo("about")} className="btn-o" style={{padding: '14px 30px'}}>Explore Strategy</button>
              </div>
            </div>
            
          </div>
        </section>
      )}

      {/* Services Section */}
      <section style={{ padding: "100px 0", background: "var(--bg-color)" }}>
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
                <button className="btn-p" style={{ width: '100%' }} onClick={() => handleBookSession()}>
                  Get Guidance
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--nav-bg)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: '0 18px 50px rgba(0,0,0,0.12)', margin: '0 5vw' }}>
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
      </section>

      {/* ─── ABOUT SECTION WITH 3 REVIEWS ─── */}
      <section id="about" style={{ padding: "100px 5vw", background: "var(--nav-bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "start" }}>
            
            <div className="about-text-content">
              <span className="sub-title-accent" style={{ color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>✦ Strategic Admissions</span>
              <h2 style={{ fontSize: "2.8rem", fontWeight: 800, margin: "15px 0" }}>Strategic Admission <span style={{color: "var(--accent)"}}>Roadmaps</span></h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "20px", fontSize: "1.05rem" }}>
                From detailed 2026-2027 fee structures and scholarship eligibility to 
                <strong> Management and Government Quota</strong> counseling, we offer a 
                one-stop solution for students and parents.
              </p>
              <button className="btn-p" onClick={() => handleBookSession()}>Start Your Free Consultation →</button>
            </div>
            
            <div style={{ display: "grid", gap: "20px" }}>
              {[
                { name: "Arun Kumar", role: "Engineering Aspirant", rating: 5, text: "Got into DSUT with clear guidance on fees. Highly recommended!" },
                { name: "Dr. Meera S.", role: "Parent", rating: 5, text: "The most transparent admission guidance. They saved us from paying huge donations." },
                { name: "Priya D.", role: "Abroad MBBS Student", rating: 5, text: "The abroad admission roadmap was a lifesaver. Extremely professional." }
              ].map((review, i) => (
                <div key={i} className="review-card" style={{ background: "var(--bg-color)", padding: "25px", border: "1px solid var(--border)", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
                  <div style={{ color: "#FFD700", marginBottom: "10px" }}>{"★".repeat(review.rating)}</div>
                  <p style={{ fontStyle: "italic", fontSize: "0.95rem", color: "var(--text-main)", marginBottom: "10px" }}>"{review.text}"</p>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--accent)" }}>{review.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{review.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer id="footer" style={{ padding: "60px 5vw 40px", borderTop: "1px solid var(--border)", background: "var(--bg-color)" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px" }}>
          <div className="footer-row">
            <h4>Branches</h4>
            <p>Chennai • Coimbatore • Salem</p>
          </div>
          <div className="footer-row">
            <h4>Contact Us</h4>
            <p>📞 7448996999</p>
            <p>📞 7094349494</p>
          </div>
          <div className="footer-row">
            <h4>Social Media</h4>
            <p>Instagram: @Fut_urewayto</p>
            <p>Facebook: Way to future</p>
            <p>Youtube: www.youtube.com/@WayToFutureedu</p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {selectedCollege && (
        <AdmissionModal college={selectedCollege} onClose={() => setSelectedCollege(null)} 
          onBookClick={() => { setSelectedCollege(null); handleBookSession(selectedCollege.name); }} 
        />
      )}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} collegeName={prefillCollege} />
    </div>
  );
}