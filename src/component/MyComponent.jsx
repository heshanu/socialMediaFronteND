import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    if (!apiUrl) {
      console.error('Backend URL not found');
      setError('Backend URL not found');
      return;
    }

    fetch(`${apiUrl}/employees`)
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
            {/* Avoid logging sensitive information */}
            {/* <h2>{user.password}</h2> */}
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
