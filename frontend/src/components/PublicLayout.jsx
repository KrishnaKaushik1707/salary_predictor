import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-white selection:bg-primary/30">
      <Navbar />
      <main className="flex-grow pt-[88px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
