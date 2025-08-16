import React from 'react';

const Header = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      className="relative text-white pt-24 pb-28 md:pt-32 md:pb-36 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.imgur.com/xLAWKJ2.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          <div className="reveal">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-xl">
              Realize seus sonhos com a WS Consórcios
            </h1>
          </div>
          <div className="reveal" style={{ transitionDelay: '200ms' }}>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-medium mb-8 max-w-2xl mx-auto drop-shadow-md">
              Carro novo, casa própria ou o que você quiser. A gente te ajuda a chegar lá.
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: '400ms' }}>
            <a
              href="#simulator-section"
              onClick={handleScroll}
              className="inline-block bg-[#2563EB] text-white font-bold px-8 py-3.5 md:px-10 md:py-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 text-md md:text-lg"
            >
              Simular Agora
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;