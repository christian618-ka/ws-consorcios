import React from 'react';
import { advantagesData } from '../constants';

const AdvantagesSection = () => (
  <section className="py-16 sm:py-20 bg-gray-50">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-12 reveal">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2B57]">Vantagens da WS Consórcios</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Veja por que o consórcio é a forma mais inteligente de planejar suas conquistas.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {advantagesData.map((a, i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 150}ms` }}>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center h-full flex flex-col items-center">
              <div className="mb-4 flex-shrink-0">
                <img src={a.iconUrl} alt={a.alt} className="w-20 h-20 object-contain" loading="lazy" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{a.title}</h3>
              <p className="text-slate-500 text-base flex-grow">{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AdvantagesSection;