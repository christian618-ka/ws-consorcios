import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const FloatingWhatsAppButton = () => {
  const floatMessage = encodeURIComponent('Olá! Visitei o site da ws consorcios e gostaria de mais informações.');
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${floatMessage}`;
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 md:bottom-8 right-6 md:right-8 bg-[#2563EB] text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-transform duration-300 hover:scale-110 z-50 flex items-center justify-center" aria-label="Falar com especialista da WS Consórcios no WhatsApp">
      <img src="https://i.imgur.com/074JREb.png" alt="WhatsApp" className="h-8 w-8 md:h-9 md:w-9" />
    </a>
  );
};

export default FloatingWhatsAppButton;