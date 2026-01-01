import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assets from '../../assets/assets';
import FileViewer from './FileViewer';
import './Learn.css';

const API_BASE_URL = "https://creative-studio-backend.onrender.com";

function Learn() {
  const [notes, setNotes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/notes`)
      .then(res => setNotes(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="learn-page">
      <div className="header">
        <h1>Free Books & PDFs</h1>
        <p>Access high-quality study materials and handwritten notes.</p>
      </div>

      <div className="container">
        {loading ? (
           <p>Loading...</p>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => {
              const isImage = note.filePath.match(/\.(jpeg|jpg|gif|png)$/i);
              
              return (
                <div key={note._id} className="note-card">
                  {/* SMALL VIEW / THUMBNAIL AREA */}
                  <div className="card-preview">
                    {isImage ? (
                      <img src={note.filePath} alt="thumb" />
                    ) : (
                      <div className="pdf-placeholder">
                        <span className="pdf-icon">PDF</span>
                      </div>
                    )}
                  </div>

                  {/* TITLE & INFO FORMAT */}
                  <div className="card-info">
                    <span className="note-tag">{note.type}</span>
                    <h3>{note.title}</h3>
                    <p className="subject-text">{note.subject}</p>
                    <div className="card-footer">
                      <span className="class-badge">Class {note.class}</span>
                      <button 
                        onClick={() => setSelectedFile(note.filePath)} 
                        className="open-btn"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <FileViewer fileUrl={selectedFile} onClose={() => setSelectedFile(null)} />
    </div>
  );
}

export default Learn;