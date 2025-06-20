import React, { useState, useEffect } from 'react';

function Data2(){
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
        console.log("1");
        fetch('http://localhost:8000/report')
            .then(response => response.json())
            .then(data=> {
                console.log("2")
                setNumbers(data);;
                setLoading(false);
            })
            .catch(error=>setError(error));
  }, []);
  if (loading) return <div>Loading numbers...</div>;
  if (error) return <div>Error loading numbers: {error}</div>;
  return (
    <div className="number-container">
      <h2>Numbers</h2>
        {!numbers || numbers.length === 0 ? (
            <p>No numbers found</p>
      ) : (
        <ul>
            {numbers.map((number) => (
                <li key={number}>
                    {number}
                </li>
            ))}
        </ul>
      )}
    </div>
  );
};
export default Data2;
























