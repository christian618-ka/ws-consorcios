import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0F2B57] text-slate-300 py-8 px-4">
      <div className="container mx-auto max-w-6xl text-center text-sm">
        <p>&copy; {currentYear} WS Consórcios. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;