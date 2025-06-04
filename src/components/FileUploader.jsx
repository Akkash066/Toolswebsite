import React from 'react';
import styles from '../styles/modules/ToolModule.css';

const FileUploader = ({ onFileSelect, accept }) => (
  <div className={styles.uploadContainer}>
    <input 
      type="file" 
      accept={accept} 
      onChange={(e) => onFileSelect(e.target.files[0])} 
    />
  </div>
);

export default FileUploader;