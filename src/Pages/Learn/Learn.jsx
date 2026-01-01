import React, { useState, useEffect } from 'react';
import axios from 'axios';
import assets from '../../assets/assets';
import FileViewer from '../Fileview/Fileview';
import './Learn.css';

const API_BASE_URL = "https://creative-studio-backend.onrender.com";

function Learn() {
  const [notes, setNotes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/notes`)
      .then(res => setNotes(res.data))
      .catch(err => console.error("Error loading notes:", err))
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
           <div className="loader">Loading study materials...</div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => {
              const isImage = note.filePath?.match(/\.(jpeg|jpg|gif|png)$/i);
              
              return (
                <div key={note._id} className="note-card">
                  {/* CARD PREVIEW AREA */}
                  <div className="card-preview">
                    {isImage ? (
                      <img src={note.filePath} alt={note.title} />
                    ) : (
                      <div className="pdf-placeholder">
                        <i className="fa fa-file-pdf"></i>
                        <span>PDF</span>
                      </div>
                    )}
                  </div>

                  {/* DETAILS IN THE CARD */}
                  <div className="card-info">
                    <div className="info-top">
                      <span className="note-tag">{note.type || 'Document'}</span>
                      <span className="class-badge">Class {note.class}</span>
                    </div>
                    
                    <h3 className="note-title">{note.title}</h3>
                    <p className="subject-text"><strong>Subject:</strong> {note.subject}</p>
                    
                    <div className="card-footer">
                      <button 
                        onClick={() => setSelectedFile(note.filePath)} 
                        className="open-btn"
                      >
                        View Full File
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FILE VIEW PAGE/OVERLAY */}
      <FileViewer fileUrl={selectedFile} onClose={() => setSelectedFile(null)} />
    </div>
  );
}

export default Learn;