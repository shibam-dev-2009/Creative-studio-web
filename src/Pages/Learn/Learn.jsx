import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assets from '../../assets/assets';
import './Learn.css';


// 1. Define your backend URL (Ensure this matches your Render URL)
const API_BASE_URL = "https://creative-studio-backend.onrender.com";

function Learn() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // 2. Use the live API URL instead of localhost
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
    <div>
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

      <h1>Notes/Books</h1>

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
                <h3>{note.title}</h3>
                <p><strong>Subject:</strong> {note.subject}</p>
                <p><strong>Class:</strong> {note.class}</p>
                <span className="badge success">{note.type}</span>
                
                {/* 3. Update the PDF link to use the live backend URL */}
                <a 
                  href={`${API_BASE_URL}/${note.filePath}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View PDF
                </a>
              </div>
            ))
          ) : (
            <p>No notes found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Learn;