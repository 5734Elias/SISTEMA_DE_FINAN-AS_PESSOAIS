/**
 * Serviço para cotações de moedas e índices via AwesomeAPI (pública, sem chave)
 */
export const fetchMarketQuotes = async () => {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL');
    if (!res.ok) throw new Error('Falha ao obter cotações');
    const data = await res.json();

    return [
      {
        ticker: 'USD / BRL',
        name: 'Dólar Comercial',
        price: parseFloat(data.USDBRL.bid),
        change: parseFloat(data.USDBRL.pctChange),
        type: 'currency',
      },
      {
        ticker: 'EUR / BRL',
        name: 'Euro',
        price: parseFloat(data.EURBRL.bid),
        change: parseFloat(data.EURBRL.pctChange),
        type: 'currency',
      },
      {
        ticker: 'BTC / BRL',
        name: 'Bitcoin',
        price: parseFloat(data.BTCBRL.bid),
        change: parseFloat(data.BTCBRL.pctChange),
        type: 'crypto',
      },
      {
        ticker: 'ETH / BRL',
        name: 'Ethereum',
        price: parseFloat(data.ETHBRL.bid),
        change: parseFloat(data.ETHBRL.pctChange),
        type: 'crypto',
      },
    ];
  } catch (error) {
    console.warn('Usando cotações de contingência offline:', error);
    // Fallback offline caso não haja conexão
    return [
      { ticker: 'USD / BRL', name: 'Dólar Comercial', price: 5.62, change: 0.35, type: 'currency' },
      { ticker: 'EUR / BRL', name: 'Euro', price: 6.15, change: -0.12, type: 'currency' },
      { ticker: 'BTC / BRL', name: 'Bitcoin', price: 345200.0, change: 2.45, type: 'crypto' },
      { ticker: 'ETH / BRL', name: 'Ethereum', price: 17800.0, change: 1.15, type: 'crypto' },
    ];
  }
};

/**
 * Notícias econômicas e financeiras (simulação dinâmica com links e dados de mercado)
 */
export const fetchFinancialNews = async () => {
  return [
    {
      id: '1',
      title: 'Copom sinaliza cautela com taxa de juros frente à inflação de serviços',
      source: 'InfoMoney',
      time: 'Há 25 minutos',
      category: 'Economia',
    },
    {
      id: '2',
      title: 'Bitcoin supera marca histórica em meio à entrada recorde em ETFs institucionais',
      source: 'CoinDesk Brasil',
      time: 'Há 1 hora',
      category: 'Cripto',
    },
    {
      id: '3',
      title: 'Ibovespa sobe impulsionado pelo setor de commodities e bancos',
      source: 'Valor Econômico',
      time: 'Há 2 horas',
      category: 'Ações',
    },
    {
      id: '4',
      title: 'Fundos Imobiliários de papel batem recorde de dividendos no trimestre',
      source: 'Suno Notícias',
      time: 'Há 3 horas',
      category: 'FIIs',
    },
  ];
};

