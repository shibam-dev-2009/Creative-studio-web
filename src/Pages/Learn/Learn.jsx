import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assets from '../../assets/assets';
import FileViewer from '../Fileview/Fileview';
import './Learn.css';

const API_BASE_URL = "https://creative-studio-backend.onrender.com";

function Learn() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/notes`)
      .then(res => setNotes(res.data))
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredNotes = notes.filter((note) => {
    const search = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(search) ||
      note.subject.toLowerCase().includes(search) ||
      note.class.toString().includes(search)
    );
  });

  return (
    <div className="learn-page">
      {/* Search and Header code stays here */}
      <div className="header">
        <h1>Free Books & PDFs</h1>
        <p>Access high-quality study materials and handwritten notes.</p>
      </div>

      <div className="search-container">
        <div className="search">
          <input 
            type="text" 
            placeholder='Search by Title, Subject, or Class...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={assets.search} alt="search" className='searchBtn'/>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="loader-container">
            <div className="custom-spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <div key={note._id} className="note-card">
                <div className="card-preview">
                  {note.filePath.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                    <img src={note.filePath} alt="thumb" />
                  ) : (
                    <div className="pdf-placeholder">📄 PDF</div>
                  )}
                </div>
                <div className="card-info">
                  <span className="note-tag">{note.type}</span>
                  <h3>{note.title}</h3>
                  <p className="subject-text"><strong>Subject:</strong> {note.subject}</p>
                  <div className="card-footer">
                    <span className="class-badge">Class {note.class}</span>
                    <button onClick={() => setSelectedFile(note.filePath)} className="button">
                      Open File
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- THIS SHOWS THE FILE VIEW PAGE --- */}
      {selectedFile && (
        <FileViewer fileUrl={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
    </div>
  );
}

export default Learn;