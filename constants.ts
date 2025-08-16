export const ASSET_CONFIG: {
  [key: string]: {
    min: number;
    max: number;
    installments: { min: number; max: number };
  };
} = {
  'Veículo': { min: 35000, max: 160000, installments: { min: 24, max: 100 } },
  'Moto': { min: 15000, max: 100000, installments: { min: 24, max: 100 } },
  'Caminhão': { min: 180000, max: 400000, installments: { min: 48, max: 120 } },
  'Imóvel': { min: 110000, max: 700000, installments: { min: 48, max: 120 } },
  'Viagem': { min: 7000, max: 30000, installments: { min: 24, max: 48 } },
  'Eletrodomésticos': { min: 6000, max: 30000, installments: { min: 24, max: 60 } },
};

export const INITIAL_INSTALLMENTS = 60;
export const ADMIN_FEE_RATE = 0.22; // Taxa de administração total de 22% (exemplo)

export const INITIAL_ASSET_TYPE = 'Veículo';
export const INITIAL_VALUE = 80000;
export const WHATSAPP_NUMBER = '557592193972';
export const FORM_ACTION_URL = 'https://api.sheetmonkey.io/form/i7bE3R7dns1V96wojPpxTe';

export const ASSET_TYPES = [
  { name: 'Veículo', imageUrl: 'https://i.imgur.com/nexcAR0.png' },
  { name: 'Moto', imageUrl: 'https://i.imgur.com/TmRbEe0.png' },
  { name: 'Caminhão', imageUrl: 'https://i.imgur.com/T9Na9Cu.png' },
  { name: 'Imóvel', imageUrl: 'https://i.imgur.com/rhcONlQ.png' },
  { name: 'Viagem', imageUrl: 'https://i.imgur.com/EWz6dt8.png' },
  { name: 'Eletrodomésticos', imageUrl: 'https://i.imgur.com/5dRzVXO.png' },
];

export const advantagesData = [
  { iconUrl: 'https://i.imgur.com/1JdpfWN.png', alt: 'Ícone Sem Juros', title: 'Sem Juros', description: 'Parcele a compra do seu bem sem pagar juros e com um processo simplificado.' },
  { iconUrl: 'https://i.imgur.com/bPypVc3.png', alt: 'Ícone Poder de Compra', title: 'Poder de Compra', description: 'Com a carta de crédito em mãos, você negocia como se estivesse pagando à vista.' },
  { iconUrl: 'https://i.imgur.com/ZJ3EB83.png', alt: 'Ícone Planos Flexíveis', title: 'Planos Flexíveis', description: 'Escolha o valor do crédito e o prazo que melhor se encaixam no seu orçamento.' },
  { iconUrl: 'https://i.imgur.com/9DBtN2E.png', alt: 'Ícone Segurança e Confiança', title: 'Segurança e Confiança', description: 'Fiscalizado pelo Banco Central e com a credibilidade da WS Consórcios.' },
];