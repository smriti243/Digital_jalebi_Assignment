import React from 'react';
import './header.css';

function Header({ toggleTheme, isDarkTheme }) {
  return (
    <header className={`Header ${isDarkTheme ? 'dark' : 'light'}`}>
      <h1 className='heading'>USER DATA</h1>
      <button className={`ThemeToggle ${isDarkTheme ? 'dark' : 'light'}`} onClick={toggleTheme}>
        <div className="Circle"></div>
      </button>
    </header>
  );
}

export default Header;
