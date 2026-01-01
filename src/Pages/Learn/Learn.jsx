import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fileview from '../Fileview/Fileview'; // Import your new file
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
      {/* ... search and header ... */}

      <div className="container">
        {notes.map(note => (
          <div key={note._id} className="note-card">
            <h3>{note.title}</h3>
            {/* Click button to open the separate file viewer */}
            <button onClick={() => setSelectedFile(note.filePath)} className="view-btn">
              Open File
            </button>
          </div>
        ))}
      </div>

      {/* USE THE SEPARATE FILE COMPONENT HERE */}
      <Fileview
        fileUrl={selectedFile} 
        onClose={() => setSelectedFile(null)} 
      />
    </div>
  );
}

export default Learn;