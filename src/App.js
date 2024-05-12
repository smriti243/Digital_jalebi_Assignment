import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './header';
import UserPopup from './userPopup'; 

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Error fetching user data:', error)
      }
    };

    fetchUserData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://dummyjson.com/users/search?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.users);
    } catch (error) {
      console.error('Error searching for users:', error);
      alert("'Error searching for users:', error")
    }
  };

 
  const handleUserNameClick = (user) => {
    setSelectedUser(user);
  };


  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  return (
    <div className={`App ${isDarkTheme ? 'dark' : 'light'}`}>
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
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
      <div className='table-container'>
        <table className='userdatatable'>
          <thead className=''>
            <tr className='column_names'>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>University</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <tr key={user.id} onClick={() => handleUserNameClick(user)}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.address.address}, {user.address.city}, {user.address.state}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>{user.phone}</td>
                  <td>{user.university}</td>
                </tr>
              ))
            ) : (
              users.map((user) => (
                <tr key={user.id} onClick={() => handleUserNameClick(user)}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.address.address}, {user.address.city}, {user.address.state}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>{user.phone}</td>
                  <td>{user.university}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {selectedUser && <UserPopup user={selectedUser} onClose={handleClosePopup} isDarkTheme={isDarkTheme}/>}
      </div>
    </div>
  );
}

export default App;
