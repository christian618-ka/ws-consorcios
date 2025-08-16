import React, { useEffect } from 'react';
import Header from './components/Header';
import AdvantagesSection from './components/AdvantagesSection';
import Simulator from './components/Simulator';
import SocialProof from './components/SocialProof';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import SpecialistSection from './components/SpecialistSection';

const App = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => {
        if (observer && el) {
            observer.unobserve(el);
        }
      });
    };
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 antialiased">
      <Header />
      <main>
        <SpecialistSection />
        <AdvantagesSection />
        <Simulator />
        <SocialProof />
        <FaqSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default App;