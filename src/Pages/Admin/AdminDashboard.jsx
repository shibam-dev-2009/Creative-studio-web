import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';


const API_BASE_URL = "https://creative-studio-backend.onrender.com";
const AdminDashboard = () => {
  const [formData, setFormData] = useState({ title: '', class: '', subject: '', type: '' });
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);
  
  // Two types of loaders
  const [loading, setLoading] = useState(false);   // For Upload/Delete actions
  const [fetching, setFetching] = useState(true); // For initial data fetch

  const API_URL = `${API_BASE_URL}/api/notes`;
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setFetching(true);
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('pdf', file);

    try {
      await axios.post(`${API_URL}/upload`, data, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ title: '', class: '', subject: '', type: '' });
      e.target.reset();
      loadData(); // Refresh list
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  setLoading(true); // Show the "Processing Request..." overlay
  try {
    const token = localStorage.getItem('token'); // Get the saved admin token
    
    await axios.delete(`${API_URL}/${id}`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });

    // Update the UI by filtering out the deleted note
    setNotes(notes.filter(note => note._id !== id));
    alert("Deleted successfully!");
  } catch (err) {
    console.error("Delete failed", err);
    alert("Delete failed: " + (err.response?.data?.message || "Check your connection"));
  } finally {
    setLoading(false); // Hide the overlay
  }
};

  return (
    <div className="admin-container">
      {/* 1. Global Action Loader (Overlay) */}
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
          <p>Processing Request...</p>
        </div>
      )}

      <h2>Upload Note</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
        <input name="class" placeholder="Class" onChange={handleChange} value={formData.class} required />
        <input name="subject" placeholder="Subject" onChange={handleChange} value={formData.subject} required />
        <input name="type" placeholder="Type" onChange={handleChange} value={formData.type} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading} className='button'>Upload</button>
      </form>

      <hr />

      <h2>Manage Notes</h2>
      {/* 2. Content Buffer (Initial Fetch) */}
      {fetching ? (
        <div className="content-loader">
          <div className="spinner small"></div>
          <p>Fetching notes from server...</p>
        </div>
      ) : (
        <table className="notes-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note._id}>
                <td>{note.title}</td>
                <td>{note.class}</td>
                <td>
                  <button className="delete-btn " onClick={() => handleDelete(note._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;