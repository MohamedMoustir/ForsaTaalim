import React, { useState } from 'react';

function ContactTutors() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <h1>HY</h1>
  );
}

export default ContactTutors;