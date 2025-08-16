import React from 'react';

const steps = [
  {
    iconUrl: 'https://i.imgur.com/L6RRV82.png',
    title: '1. Simule e Escolha',
    description: 'Use nosso simulador para escolher o crédito e o plano de pagamento que cabem no seu bolso.'
  },
  {
    iconUrl: 'https://i.imgur.com/yS4w3bY.png',
    title: '2. Entre no Grupo',
    description: 'Você fará parte de um grupo com pessoas que têm o mesmo objetivo que você.'
  },
  {
    iconUrl: 'https://i.imgur.com/8QpG8dG.png',
    title: '3. Seja Contemplado',
    description: 'Todos os meses, você pode ser sorteado ou ofertar um lance para receber sua carta de crédito.'
  },
  {
    iconUrl: 'https://i.imgur.com/dC0k8vT.png',
    title: '4. Realize seu Sonho',
    description: 'Com a carta de crédito em mãos, é só negociar a compra do seu bem à vista!'
  }
];

const HowItWorks = () => (
  <section className="py-16 sm:py-20 bg-white">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-12 reveal">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2B57]">Como Funciona o Consórcio?</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Conquistar seus objetivos com o consórcio é simples. Siga os passos:</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="reveal" style={{ transitionDelay: `${index * 150}ms` }}>
            <div className="text-center p-6 h-full">
              <img src={step.iconUrl} alt={step.title} className="w-24 h-24 mx-auto mb-4" loading="lazy" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-slate-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
