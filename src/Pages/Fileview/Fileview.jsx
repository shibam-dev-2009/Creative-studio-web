import React from 'react';
import './Fileview.css';

const FileViewer = ({ fileUrl, onClose }) => {
  if (!fileUrl) return null;

  const isPDF = fileUrl.toLowerCase().endsWith('.pdf');

  // Logic to handle download
  const handleDownload = () => {
    // Cloudinary specific: replace /upload/ with /upload/fl_attachment/ to force download
    const downloadUrl = fileUrl.replace('/upload/', '/upload/fl_attachment/');
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'StudyMaterial'); // Fallback filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="file-view-page">
      <div className="viewer-navbar">
        <button className="back-btn" onClick={onClose}>
          ← Back to Library
        </button>
        
        <span className="viewer-title">Reader Mode</span>

        {/* NEW DOWNLOAD BUTTON */}
        <button className="download-btn" onClick={handleDownload}>
          Download File
        </button>
      </div>

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