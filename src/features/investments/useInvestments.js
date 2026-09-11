import { useState, useEffect } from 'react';
import { fetchMarketQuotes, fetchFinancialNews } from './services/marketService';

const INITIAL_PORTFOLIO = [
  { id: '1', ticker: 'PETR4', name: 'Petrobras PN', type: 'stocks', quantity: 120, avgPrice: 35.50, currentPrice: 37.80 },
  { id: '2', ticker: 'VALE3', name: 'Vale ON', type: 'stocks', quantity: 80, avgPrice: 62.00, currentPrice: 60.50 },
  { id: '3', ticker: 'HGLG11', name: 'CSHG Logística', type: 'fiis', quantity: 25, avgPrice: 160.00, currentPrice: 166.40 },
  { id: '4', ticker: 'BTC', name: 'Bitcoin', type: 'crypto', quantity: 0.045, avgPrice: 310000.00, currentPrice: 345200.00 },
];

const STORAGE_PORTFOLIO_KEY = '@finances:investments';

export const useInvestments = () => {
  const [portfolio, setPortfolio] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PORTFOLIO_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  });

  const [marketQuotes, setMarketQuotes] = useState([]);
  const [news, setNews] = useState([]);
  const [loadingMarket, setLoadingMarket] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PORTFOLIO_KEY, JSON.stringify(portfolio));
    } catch {}
  }, [portfolio]);

  const refreshMarketData = async () => {
    setLoadingMarket(true);
    try {
      const [quotes, newsData] = await Promise.all([
        fetchMarketQuotes(),
        fetchFinancialNews(),
      ]);
      setMarketQuotes(quotes);
      setNews(newsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMarket(false);
    }
  };

  useEffect(() => {
    refreshMarketData();
    // Atualiza cotações a cada 60 segundos automaticamente
    const interval = setInterval(refreshMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  const addAsset = (asset) => {
    setPortfolio((prev) => [...prev, { ...asset, id: Date.now().toString() }]);
  };

  const removeAsset = (id) => {
    setPortfolio((prev) => prev.filter((a) => a.id !== id));
  };

  // Cálculos do portfólio
  const totalInvested = portfolio.reduce((acc, curr) => acc + curr.quantity * curr.avgPrice, 0);
  const currentTotalValue = portfolio.reduce((acc, curr) => acc + curr.quantity * curr.currentPrice, 0);
  const totalProfitLoss = currentTotalValue - totalInvested;
  const profitPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

  return {
    portfolio,
    marketQuotes,
    news,
    loadingMarket,
    totalInvested,
    currentTotalValue,
    totalProfitLoss,
    profitPercentage,
    addAsset,
    removeAsset,
    refreshMarketData,
  };
};
