import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

function App() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  console.log({ data });
  return (
    <>
      hello
    </>
  );
}

const GET_LAUNCHES = gql`
  query GetPastLaunched {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default App;
