/**
 * Convert Excel serial date to JavaScript Date
 * Excel stores dates as numbers (days since 1900-01-01)
 */
export const excelSerialToDate = (serial) => {
  if (!serial || typeof serial !== 'number') return null;
  
  // Excel's epoch starts at 1900-01-01, but has a bug counting 1900 as a leap year
  const excelEpoch = new Date(1899, 11, 30); // December 30, 1899
  const days = Math.floor(serial);
  const milliseconds = days * 24 * 60 * 60 * 1000;
  
  return new Date(excelEpoch.getTime() + milliseconds);
};

/**
 * Format date to YYYY-MM-DD format for display and input fields
 */
export const formatDateForInput = (dateValue) => {
  if (!dateValue) return '';
  
  let date;
  
  // Check if it's an Excel serial number
  if (typeof dateValue === 'number') {
    date = excelSerialToDate(dateValue);
  } else if (typeof dateValue === 'string') {
    // Try to parse as ISO date string
    date = new Date(dateValue);
  } else if (dateValue instanceof Date) {
    date = dateValue;
  } else {
    return '';
  }
  
  // Validate date
  if (!date || isNaN(date.getTime())) return '';
  
  // Format as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Format date for display (e.g., "Jan 15, 2024")
 */
export const formatDateForDisplay = (dateValue) => {
  if (!dateValue) return 'Not set';
  
  let date;
  
  // Check if it's an Excel serial number
  if (typeof dateValue === 'number') {
    date = excelSerialToDate(dateValue);
  } else if (typeof dateValue === 'string') {
    date = new Date(dateValue);
  } else if (dateValue instanceof Date) {
    date = dateValue;
  } else {
    return 'Not set';
  }
  
  // Validate date
  if (!date || isNaN(date.getTime())) return 'Not set';
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Convert date to ISO string for backend storage
 */
export const formatDateForBackend = (dateValue) => {
  if (!dateValue) return null;
  
  let date;
  
  if (typeof dateValue === 'number') {
    date = excelSerialToDate(dateValue);
  } else if (typeof dateValue === 'string') {
    date = new Date(dateValue);
  } else if (dateValue instanceof Date) {
    date = dateValue;
  } else {
    return null;
  }
  
  if (!date || isNaN(date.getTime())) return null;
  
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};
