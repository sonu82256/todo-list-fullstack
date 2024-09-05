import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-gray-700 py-4 mt-auto shadow-[0_35px_60px_25px_rgba(0.2,0.2,0.2,0.2)]">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} TodoList. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;