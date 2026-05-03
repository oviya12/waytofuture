import React, { useState, useRef, useEffect } from 'react';
import { COLLEGES } from '../data/Colleges';

export default function SearchModule({ onSelectCollege }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    if (q.trim().length < 2) { setResults([]); return; }
    const filtered = COLLEGES.filter(c => 
      c.name.toLowerCase().includes(q.toLowerCase()) || 
      c.zone.toLowerCase().includes(q.toLowerCase())
    );
    setResults(filtered);
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <input 
        className="fi" 
        placeholder="Search 65+ College Fees..." 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        autoComplete="off"
      />
      {isOpen && results.length > 0 && (
        <div className="search-results">
          {results.map(c => (
            <div 
              key={c.id} 
              className="search-result-item" 
              onClick={() => { onSelectCollege(c); setIsOpen(false); setQuery(""); }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{c.zone}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}