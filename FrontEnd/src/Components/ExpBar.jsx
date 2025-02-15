import React, { useState, useEffect } from 'react';

const ExpBar = () => {
  // Get initial EXP from localStorage; default to 0 if not present
  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : { exp: 0 };
  const [exp, setExp] = useState(userData.exp);

  // Function to update EXP from localStorage
  const updateExp = () => {
    const storedUser = localStorage.getItem("user");
    const newUserData = storedUser ? JSON.parse(storedUser) : { exp: 0 };
    const newExp = newUserData.exp;
    if (newExp !== exp) {
      setExp(newExp);
    }
  };

  // Listen for localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event) => {
      // When any changes occur in localStorage for "user", update our EXP.
      if (event.key === 'user') {
        updateExp();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [exp]);

  // Poll for changes in the same tab (since storage events don’t fire here)
  useEffect(() => {
    const intervalId = setInterval(updateExp, 500); // checks every 500ms
    return () => clearInterval(intervalId);
  }, [exp]);

  // Level System: Each level requires 100 EXP.
  // Calculate the current level:
  const level = Math.floor(exp / 100) + 1;
  // EXP within the current level:
  const currentLevelExp = exp % 100;
  // Required EXP for the current level:
  const maxExpForLevel = 100;
  // Calculate percentage progress for the current level:
  const percentage = (currentLevelExp / maxExpForLevel) * 100;

  return (
    <div>
      {/* Display the current level */}
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Level: {level}
      </div>
      
      {/* The EXP bar */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          overflow: 'hidden',
          width: '100%',
          height: '20px',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#4caf50',
            transition: 'width 0.5s ease-in-out',
          }}
        />
      </div>

      {/* Display the EXP numbers */}
      <div style={{ marginTop: '5px' }}>
        {currentLevelExp} / {maxExpForLevel} EXP
      </div>
    </div>
  );
};

export default ExpBar;
