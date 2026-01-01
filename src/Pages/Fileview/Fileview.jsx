import React from 'react';
import './Fileview.css';

const FileViewer = ({ fileUrl, onClose }) => {
  if (!fileUrl) return null;

  const isPDF = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="viewer-overlay" onClick={onClose}>
      <div className="viewer-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="viewer-body">
          {isPDF ? (
            <iframe 
              src={fileUrl} 
              title="PDF Document" 
              className="pdf-frame"
            />
          ) : (
            <img src={fileUrl} alt="Preview" className="img-preview" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileViewer;