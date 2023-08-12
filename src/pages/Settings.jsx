
import { useEffect, useState } from 'react';

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    }
    else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="App">
      <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <p>This is a test</p>
      <button
        className="dark-mode-toggle"
        onClick={() => {
          setDarkMode(!darkMode);
        }}>
        <div className="dark-mode-slider" />
      </button>
    </div>
  );
}

export default Settings;

