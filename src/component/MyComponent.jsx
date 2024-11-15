import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(process.env.TEST);
    
    const apiUrl = "http://127.0.0.1:8081/api/v1/user"

    if (!apiUrl) {
      console.error('REACT_APP_BACKENDURL is not defined');
      setError('REACT_APP_BACKENDURL is not defined');
      return;
    }

    fetch(`${apiUrl}/users`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Data</h1>
      {data.length > 0 ? (
        data.map((user, index) => (
          <div key={index}>
            <h2>{user.firstName}</h2>
            <h2>{user.lastName}</h2>
            <h2>{user.email}</h2>
            <h2>{user.password}</h2>
            <hr />
          </div>
        ))
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default MyComponent;
