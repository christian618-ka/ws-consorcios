import React, { useState, useMemo, useEffect } from 'react';
import {
  ASSET_CONFIG,
  INITIAL_INSTALLMENTS,
  ADMIN_FEE_RATE,
  INITIAL_ASSET_TYPE,
  INITIAL_VALUE,
  WHATSAPP_NUMBER,
  FORM_ACTION_URL,
  ASSET_TYPES
} from '../constants';

const Simulator = () => {
  const [assetType, setAssetType] = useState(INITIAL_ASSET_TYPE);
  const [creditValue, setCreditValue] = useState(INITIAL_VALUE);
  const [installments, setInstallments] = useState(INITIAL_INSTALLMENTS);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const assetConfig = ASSET_CONFIG[assetType] || ASSET_CONFIG['Eletrodomésticos'];
  const { min: minCredit, max: maxCredit } = assetConfig;
  const { min: minInstallments, max: maxInstallments } = assetConfig.installments;

  useEffect(() => {
    const newCreditValue = Math.max(minCredit, Math.min(creditValue, maxCredit));
    if (newCreditValue !== creditValue) {
      setCreditValue(newCreditValue);
    }
  }, [assetType, creditValue, minCredit, maxCredit]);

  const handleAssetTypeChange = (t: string) => {
    setAssetType(t);
    const { installments: newLimits } = ASSET_CONFIG[t];
    setInstallments(prev => Math.max(newLimits.min, Math.min(prev, newLimits.max)));
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => setCreditValue(Number(e.target.value));
  const handleInstallmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => setInstallments(Number(e.target.value));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      let phoneValue = value.replace(/\D/g, '').substring(0, 11);
      if (phoneValue.length > 2) phoneValue = `(${phoneValue.substring(0, 2)}) ${phoneValue.substring(2)}`;
      if (phoneValue.length > 9) phoneValue = `${phoneValue.substring(0, 10)}-${phoneValue.substring(10)}`;
      setFormData((p) => ({ ...p, [name]: phoneValue }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  const isFormValid = useMemo(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const phoneDigits = formData.phone.replace(/\D/g, '');
    return formData.name.trim().length > 2 && isEmailValid && phoneDigits.length >= 10;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);
    setError('');

    const fd = new FormData();
    fd.append('Valor do Crédito', formatCurrency(creditValue));
    fd.append('Tipo de Bem', assetType);
    fd.append('Parcelas', `${installments}x`);
    fd.append('Nome', formData.name);
    fd.append('Email', formData.email);
    fd.append('Telefone', formData.phone);
    fd.append('Created', 'x-sheetmonkey-current-date-time');

    try {
      const resp = await fetch(FORM_ACTION_URL, { method: 'POST', body: fd });
      if (resp.ok) setIsSuccess(true); else throw new Error('Falha no envio da simulação.');
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua simulação. Tente novamente mais tarde.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const monthlyPayment = (creditValue * (1 + ADMIN_FEE_RATE)) / installments;

  const valueSliderProgress = maxCredit > minCredit ? ((creditValue - minCredit) / (maxCredit - minCredit)) * 100 : 0;
  const installmentsSliderProgress = maxInstallments > minInstallments ? ((installments - minInstallments) / (maxInstallments - minInstallments)) * 100 : 0;
  
  const whatsappMessage = encodeURIComponent(`Olá! Meu nome é ${formData.name}. Gostaria de mais informações sobre uma carta de crédito de consórcio para ${assetType} no valor de ${formatCurrency(creditValue)} em ${installments} parcelas.`);

  return (
    <section id="simulator-section" className="py-16 sm:py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="reveal">
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-200 max-w-3xl mx-auto">
            {!isSuccess ? (
              <>
                {/* Passo 1 */}
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800"><span className="text-[#0F2B57]">1.</span> Para que você usaria o crédito?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                    {ASSET_TYPES.map(({ name, imageUrl }) => (
                      <button key={name} onClick={() => handleAssetTypeChange(name)} className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 font-semibold transition-all duration-200 text-sm sm:text-base ${assetType === name ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-lg' : 'bg-white text-slate-700 border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'}`}>
                        <img src={imageUrl} alt={name} className="w-16 h-16 mb-2" loading="lazy" />
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Passo 2 */}
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800"><span className="text-[#0F2B57]">2.</span> Qual valor você precisa?</h3>
                  <div className="text-center my-6">
                    <div className="text-4xl md:text-5xl font-bold text-[#0F2B57] mb-2">{formatCurrency(creditValue)}</div>
                    <div className="text-slate-500 text-sm">Simule entre {formatCurrency(minCredit)} e {formatCurrency(maxCredit)}</div>
                  </div>
                  <div className="my-8">
                    <input type="range" min={minCredit} max={maxCredit} step={500} value={creditValue || minCredit} onChange={handleSliderChange} style={{ backgroundSize: `${valueSliderProgress}% 100%` }} className="slider-styled w-full" />
                    <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                      <span>{formatCurrency(minCredit)}</span>
                      <span>{formatCurrency(maxCredit)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Passo 3: Escolha de Parcelas */}
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800"><span className="text-[#0F2B57]">3.</span> Em quantos meses você quer pagar?</h3>
                  <div className="text-center my-6">
                    <div className="text-4xl md:text-5xl font-bold text-[#0F2B57] mb-2">{installments || minInstallments} meses</div>
                    <div className="text-slate-500 text-sm">Escolha entre {minInstallments} e {maxInstallments} parcelas</div>
                  </div>
                  <div className="my-8">
                    <input type="range" min={minInstallments} max={maxInstallments} value={installments || minInstallments} onChange={handleInstallmentsChange} style={{ backgroundSize: `${installmentsSliderProgress}% 100%` }} className="slider-styled w-full" />
                    <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                      <span>{minInstallments}x</span>
                      <span>{maxInstallments}x</span>
                    </div>
                  </div>
                </div>

                {/* Passo 4 */}
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 text-slate-800"><span className="text-[#0F2B57]">4.</span> Confira sua simulação (sem juros)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="text-center p-6 bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center h-full">
                      <div className="font-bold text-slate-800 text-lg sm:text-xl">{formatCurrency(creditValue)}</div>
                      <p className="text-slate-500 text-sm">Crédito total</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center h-full">
                      <div className="font-bold text-slate-800 text-lg sm:text-xl">{formatCurrency(monthlyPayment)}</div>
                      <p className="text-slate-500 text-sm">Parcela aproximada</p>
                    </div>
                  </div>
                </div>

                {/* Passo 5 */}
                <div className="mt-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800"><span className="text-[#0F2B57]">5.</span> Preencha seus dados</h3>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                      <label>
                        <span className="sr-only">Seu nome completo</span>
                        <input type="text" name="name" placeholder="Seu nome completo" required value={formData.name} onChange={handleInputChange} className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition" />
                      </label>
                      <label>
                        <span className="sr-only">Seu melhor e-mail</span>
                        <input type="email" name="email" placeholder="Seu melhor e-mail" required value={formData.email} onChange={handleInputChange} className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition" />
                      </label>
                      <label>
                        <span className="sr-only">Seu WhatsApp (DDD + número)</span>
                        <input type="tel" name="phone" placeholder="Seu WhatsApp (DDD + número)" required value={formData.phone} onChange={handleInputChange} className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition" />
                      </label>
                    </div>
                    <button type="submit" disabled={!isFormValid || isSubmitting} className="mt-6 w-full bg-[#2563EB] text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center text-lg">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : 'Receber Proposta'}
                    </button>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                  </form>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Simulação enviada com sucesso!</h3>
                <p className="text-slate-600 mb-6">Em breve um de nossos especialistas entrará em contato com você pelo WhatsApp.</p>
                <a href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-green-500 text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-green-600 transition-transform duration-300 hover:scale-105 text-md">
                  Falar com especialista
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simulator;