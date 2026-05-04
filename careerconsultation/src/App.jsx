import { useState, useEffect } from "react";
import SearchModule from "./components/SearchModule";
import AdmissionModal from "./components/AdmissionModal";
import BookingModal from "./components/BookingModal";
import './App.css';

export default function App() {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [prefillCollege, setPrefillCollege] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const CONTACT_NUMBER = "7448996999";
  const WHATSAPP_TEXT = encodeURIComponent("Hello Way2Future! I need admission guidance for Engineering/MBBS/Arts & Science.");

  // Carousel Images List
  const carouselImages = [
    "Screenshot 2026-05-01 233724.png",
    "Screenshot 2026-05-01 233657.png",
    "WhatsApp Image 2026-05-01 at 11.24.32 PM.jpeg",
    "WhatsApp Image 2026-05-01 at 11.22.45 PM.jpeg",
    "WhatsApp Image 2026-05-01 at 11.21.59 PM.jpeg",
    "WhatsApp Image 2026-05-01 at 11.21.34 PM.jpeg"
  ];

  const handleBookSession = (collegeName = "") => {
    setPrefillCollege(collegeName);
    setBookingOpen(true);
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
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Carousel Manual Nav Controls
  const nextSlide = () => setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div style={{ background: "var(--bg-color)", minHeight: "100vh", position: "relative" }}>
      <div className="noise" />

      {/* ─── RUNNING ANNOUNCEMENT TICKER ─── */}
      <div className="marquee-bar">
        <div className="marquee-text-wrapper">
          <span>
            🚨 <strong>Admissions are open in top universities for the year 2026!</strong> &nbsp;
            Contact our experts today to secure your seat. &nbsp; | &nbsp;
            Call Now: <strong>+91-{CONTACT_NUMBER}</strong> &nbsp;
            <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => handleBookSession()}>
              [Book Free Session]
            </span>
          </span>
        </div>
      </div>

      {/* ─── NAVIGATION ─── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ 
        position: "fixed", 
        top: scrolled ? "0" : "36px", 
        left: 0, right: 0, zIndex: 100, 
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        height: "auto", minHeight: "80px", display: "flex", flexWrap: "wrap", alignItems: "center", padding: "15px 5vw",
        transition: "all 0.4s ease", borderBottom: scrolled ? "1px solid var(--border)" : "none", gap: "15px"
      }}>
        
        {/* 1. Logo & About Us */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/waytofuture_logo.png"
                alt="Way2Future logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <span className="logo-text" style={{ fontSize: "1.08rem", fontWeight: 700 }}>Way2Future</span>
          </div>
          <button onClick={() => scrollTo('about')} className="nav-link">About Us</button>
        </div>

        {/* 2. CENTRE ATTENTION: SEARCHBAR */}
        <div style={{ flex: "1 1 250px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <SearchModule onSelectCollege={setSelectedCollege} />
          </div>
        </div>

        {/* 3. RIGHT ATTENTION: CONTACTS & BOOKING */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <a href={`tel:${CONTACT_NUMBER}`} className="nav-contact-btn call-btn">
            <span className="icon">📞</span>
            <span className="label">Call</span>
          </a>
          
          <a href={`https://wa.me/${CONTACT_NUMBER}?text=${WHATSAPP_TEXT}`} target="_blank" rel="noreferrer" className="nav-contact-btn whatsapp-btn">
            <span className="icon">💬</span>
            <span className="label">WhatsApp</span>
          </a>

          <button className="btn-p" style={{ padding: "10px 20px" }} onClick={() => handleBookSession()}>
            Book Session
          </button>

          <button onClick={toggleTheme} className="theme-toggle" style={{ width: "40px", height: "40px" }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section style={{ minHeight: "85svh", display: "flex", alignItems: "center", padding: "160px 5vw 72px" }}>
        <div className="responsive-hero-grid" style={{ width: "100%" }}>
          
          {/* Left Side Content - Lower Fraction */}
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
              <button className="btn-p" style={{padding: '16px 35px', fontSize: '1rem'}} onClick={() => handleBookSession()}>Book Free Session</button>
              <button onClick={() => scrollTo('about')} className="btn-o" style={{padding: '16px 35px'}}>Explore Strategy</button>
            </div>
          </div>

          {/* Right Side Carousel - Higher Fraction */}
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
      <footer style={{ padding: "60px 5vw 40px", borderTop: "1px solid var(--border)", background: "var(--bg-color)" }}>
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