import React from 'react';
import './Fileview.css';

const FileViewer = ({ fileUrl, onClose }) => {
  if (!fileUrl) return null;

  const isPDF = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="file-view-page">
      {/* Page Header / Navbar */}
      <div className="viewer-navbar">
        <button className="back-btn" onClick={onClose}>
          ← Back to Library
        </button>
        <span className="viewer-title">Reader Mode</span>
      </div>

      {/* Main Content Area */}
      <div className="viewer-main-content">
        {isPDF ? (
          <iframe 
            src={`${fileUrl}#toolbar=0`} 
            title="PDF Reader" 
            className="full-page-iframe"
          />
        ) : (
          <div className="image-scroll-container">
            <img src={fileUrl} alt="Document View" className="full-view-img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;