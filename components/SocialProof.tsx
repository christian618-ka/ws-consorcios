import React from 'react';

const testimonials = [
  { imageUrl: 'https://i.imgur.com/A9lo5EV.jpeg', quote: 'Acreditei e hoje comemoro meu sonho realizado. Gratidão!' },
  { imageUrl: 'https://i.imgur.com/7ZglTW2.jpeg', quote: 'Com planejamento e a assessoria certa, tudo se torna possível.' },
  { imageUrl: 'https://i.imgur.com/cgk0Q40.jpeg', quote: 'O consórcio foi a melhor decisão para alcançar meu objetivo sem juros.' },
  { imageUrl: 'https://i.imgur.com/sJD9DwI.jpeg', quote: 'Finalmente com as chaves na mão! Uma sensação indescritível.' },
  { imageUrl: 'https://i.imgur.com/DKFKzvK.jpeg', quote: 'Obrigado por fazerem parte desta conquista tão importante.' },
  { imageUrl: 'https://i.imgur.com/w1OSFhY.jpeg', quote: 'Investir no meu futuro com o consórcio foi um passo de grande sucesso.' },
];

const StarRating = () => (
  <div className="flex justify-center text-yellow-400 mb-3">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 .587l3.668 7.428 8.332 1.21-6.001 5.854 1.416 8.293-7.415-3.896-7.415 3.896 1.416-8.293-6.001-5.854 8.332-1.21z"/>
      </svg>
    ))}
  </div>
);

const SocialProof = () => (
  <section className="py-16 sm:py-20 bg-gray-100">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-12 reveal">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2B57]">Quem Realizou, Recomenda</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Histórias de quem confiou na WS Consórcios para transformar sonhos em realidade.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="reveal bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-2" style={{ transitionDelay: `${index * 150}ms` }}>
            <div className="relative">
              <img src={testimonial.imageUrl} alt={`Depoimento de cliente ${index + 1}`} className="w-full h-64 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <StarRating />
                <p className="text-white font-medium italic">"{testimonial.quote}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;