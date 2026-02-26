import React, { useEffect } from 'react';
import PortfolioSummary from '../../components/PortfolioSummary';
import { stocks } from '../../data/stockData';
import { usePortfolioStore } from '../../stores/usePortfolioStore';

const PortfolioFeature: React.FC = () => {
  const loadPortfolio = usePortfolioStore((state) => state.loadPortfolio);

  useEffect(() => {
    loadPortfolio(stocks);
  }, [loadPortfolio]);

  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Portfolio Summary</h2>
      <PortfolioSummary availableStocks={stocks} />
    </>
  );
};

export default PortfolioFeature; // REQUIRED for React.lazy()