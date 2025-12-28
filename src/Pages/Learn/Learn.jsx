import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assets from '../../assets/assets';
import './Learn.css';

function Learn() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // 1. Added loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Optional: Add a small delay if your local server is too fast to see the loader
        // await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        const res = await axios.get("http://localhost:5000/api/notes");
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        // 2. Stop loading regardless of success or error
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

      {/* 3. Conditional Rendering for Loader */}
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
                
                <a 
                  href={`http://localhost:5000/${note.filePath}`} 
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