import React, { useState } from 'react';

const faqData = [
  {
    question: 'O que é um consórcio?',
    answer: 'É uma forma de compra planejada e colaborativa, onde um grupo de pessoas se une para adquirir bens (como carros, imóveis ou serviços). Mensalmente, os participantes são contemplados com uma carta de crédito no valor do plano escolhido, por meio de sorteio ou lance.'
  },
  {
    question: 'Como funciona a contemplação?',
    answer: 'A contemplação pode ocorrer de duas formas: por sorteio, onde todos os participantes ativos têm chances iguais de serem sorteados, ou por lance, onde você pode ofertar um valor para antecipar o recebimento da sua carta de crédito. O maior lance (geralmente em percentual do valor do crédito) é o vencedor.'
  },
  {
    question: 'Consórcio tem juros?',
    answer: 'Não! Essa é uma das maiores vantagens. Diferente de um financiamento, no consórcio você não paga juros. Existe apenas a taxa de administração, que é um percentual fixo diluído nas parcelas para a empresa que gerencia o grupo.'
  },
  {
    question: 'Posso usar a carta de crédito para comprar qualquer bem?',
    answer: 'A carta de crédito deve ser usada para adquirir um bem ou serviço dentro da categoria do seu grupo (por exemplo, um carro se o grupo for de veículos). Você tem liberdade para escolher a marca, modelo e vendedor que preferir, seja novo ou usado (de acordo com as regras do contrato).'
  },
  {
    question: 'O consórcio é um investimento seguro?',
    answer: 'Sim. As administradoras de consórcio são fiscalizadas e regulamentadas pelo Banco Central do Brasil, o que garante total segurança e transparência para os participantes durante todo o processo.'
  }
];

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-800 focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path></svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <p className="text-slate-600 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2B57]">Dúvidas Frequentes</h2>
          <p className="mt-4 text-lg text-slate-600">Encontre aqui as respostas para as perguntas mais comuns.</p>
        </div>
        <div className="reveal">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;