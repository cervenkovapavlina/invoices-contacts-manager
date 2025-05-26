import DjangoClient from 'utils/DjangoClient';
import React, { useState, useEffect } from 'react';

function Data() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function okCallback(data) {
    if (data) {
        setLoading(false);
        setNumbers(data);
    } else {
        setError('No data loaded. ');
    }
  }

  useEffect(() => {
      let client = new DjangoClient();
      client.get('report', okCallback, setError)
  }, []);

  if (loading) {
      return <div>Loading numbers...</div>;
  }

  if (error) {
      return <div>Error loading numbers: {error}</div>;
  }

  return (
    <div className="Data">
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
}

export default Data;