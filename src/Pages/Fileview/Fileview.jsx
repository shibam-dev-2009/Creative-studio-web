import React from 'react';
import './FileViewer.css';

const FileViewer = ({ fileUrl, onClose }) => {
  if (!fileUrl) return null;

  const isPDF = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="viewer-overlay" onClick={onClose}>
      <div className="viewer-content" onClick={(e) => e.stopPropagation()}>
        <div className="viewer-header">
           <span>File Preview</span>
           <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="viewer-body">
          {isPDF ? (
            <iframe 
              src={`${fileUrl}#toolbar=0`} 
              title="PDF Viewer" 
              className="pdf-frame" 
            />
          ) : (
            <img src={fileUrl} alt="Full view" className="img-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileViewer;