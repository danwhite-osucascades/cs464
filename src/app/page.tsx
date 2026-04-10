'use client';
import { useEffect, useState } from 'react';

export default function Home() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/sample_data');
        const result = await response.json();
        setData(result);
        console.log(data);
     }
   fetchData();
   }, []);

  return (
    <main>
      <div>Welcome to CS464!</div>
    </main>
  );
}
