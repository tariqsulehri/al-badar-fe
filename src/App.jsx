import React, { useState } from 'react';
import Navbar from '../src/components/menu/nav';
import CreateCity from '../src/features/config/city/list.city'
import CreateProv from '../src/features/config/provience/create.prov'
import AppRoutes from './routes';


const App = () => {

  return (
    <div>
        <Navbar/> 
        <AppRoutes />
      
    </div>
  );
};

export default App;