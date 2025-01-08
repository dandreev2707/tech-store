const fs = require('fs');
const path = require('path');

const clearLocalStorage = () => {
  const storagePath = path.join(__dirname, 'node_modules/.cache/localStorage');
  
  fs.rmdir(storagePath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error clearing localStorage:', err);
    } else {
      console.log('localStorage cleared.');
    }
  });
};

clearLocalStorage();
