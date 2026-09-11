/**
 * Formata um número para moeda BRL (Reais).
 * @param {number} value - O valor a ser formatado.
 * @returns {string} - Valor formatado (ex: R$ 1.500,00)
 */
export const formatCurrency = (value) => {
  if (typeof value !== 'number') return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

