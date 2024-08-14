import React from 'react';
import NavbarComponent from '../Component/Navbar';
import Dashboard from './Dashboard';

const Layout = () => {
  return (
    <div>
      <NavbarComponent />
      <Dashboard/>
    </div>
  );
};

export default Layout;
