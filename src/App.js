// import logo from './logo.svg';
// import './App.css';
// import Bg from './components/background.js';

// function App() {
//    return (
   
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//    );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './header';

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);


  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the function to fetch user data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Function to handle search form submission
  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('https://dummyjson.com/users/search?q=${searchQuery}');
      const data = await response.json();
      setSearchResults(data.users);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  return (
    <div className={`App ${isDarkTheme ? 'dark' : 'light'}`}>

    <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      
      {/* Search form */}
      <form className='userdataform' onSubmit={handleSearchSubmit}>
        <input
          className='searchbox'
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className='searchbtn' type="submit">Search</button>
      </form>
      
      {/* Display user data */}
      <div className='table-container'>
      <table className='userdatatable'>
        <thead className='' >
          <tr className='column_names'>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>University</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address.address}, {user.address.city}, {user.address.state}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.university}</td>
                {/* Add more table cells with user data as needed */}
              </tr>
            ))
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address.address}, {user.address.city}, {user.address.state}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.university}</td>
                {/* Add more table cells with user data as needed */}
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;