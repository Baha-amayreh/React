import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MasterPage from './Components/MasterPage/MasterPage';
export const DataContext = React.createContext();
function App() {
  const copyRight = {
    year: '2030',
    company: 'MIU',
    email: 'admin@miu.edu'
  };
  return (
    <DataContext.Provider value={copyRight}>
      <MasterPage />
    </DataContext.Provider>
  );
}
export default App;
