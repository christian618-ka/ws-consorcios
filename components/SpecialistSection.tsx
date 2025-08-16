import React from 'react';

const SpecialistSection = () => {
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
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Image Column */}
          <div className="md:col-span-2 reveal flex justify-center">
            <div className="relative p-2">
              <img
                src="https://i.imgur.com/XghqSZa.jpeg"
                alt="Valter Amaro - Especialista em Consórcio"
                className="rounded-xl shadow-2xl w-full max-w-sm h-auto object-cover relative z-10"
              />
              {/* Neon Glow Effect */}
              <div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-50"></div>
            </div>
          </div>

          {/* Text Column */}
          <div className="md:col-span-3 reveal" style={{ transitionDelay: '150ms' }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2B57] mb-4">
              Valter Amaro
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Especialista em consórcio, com anos de experiência para proporcionar a realização do seu sonho. Conte comigo para uma jornada transparente, segura e focada nos seus objetivos.
            </p>
            <a
              href="#simulator-section"
              onClick={handleScroll}
              className="inline-block bg-[#2563EB] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 text-md"
            >
              Simular Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialistSection;