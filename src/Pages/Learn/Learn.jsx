import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assets from '../../assets/assets';
import './Learn.css';

// 1. Define your backend URL
const API_BASE_URL = "https://creative-studio-backend.onrender.com";

function Learn() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/notes`);
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="learn-page">
      <div className="header">
        <h1>Free book and pdf</h1>
        <p>Access high-quality study materials, handwritten notes, and PYQs for free.</p>
      </div>

      <div className="search">
        <input 
          type="text" 
          placeholder='Search Books or PDF'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={assets.search} alt="search" className='searchBtn'/>
      </div>

      <h2 className="section-title">Notes/Books</h2>

      {loading ? (
        <div className="loader-container">
          <div className="custom-spinner"></div>
          <p>Loading study materials...</p>
        </div>
      ) : (
        <div className="container">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note._id} className="note-card">
                {/* 2. Fix Image Preview Logic */}
                {note.filePath && note.filePath.match(/\.(jpeg|jpg|gif|png)$/i) && (
                   <div className="card-image">
                     <img src={note.filePath} alt={note.title} className="note-preview-img" />
                   </div>
                )}
                
                <div className="card-content">
                  <h3>{note.title}</h3>
                  <p><strong>Subject:</strong> {note.subject}</p>
                  <p><strong>Class:</strong> {note.class}</p>
                  <span className="badge success">{note.type}</span>
                  
                  {/* 3. FIXED: Corrected href syntax */}
                  <a 
                    href={note.filePath} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    {note.filePath.match(/\.pdf$/i) ? "View PDF" : "View Image"}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No notes found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Learn;