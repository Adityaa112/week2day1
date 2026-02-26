import React, { useEffect, useState } from 'react';
import type { Stock } from '../types/stock.types';
import { usePortfolioStore } from '../stores/usePortfolioStore';

interface PortfolioSummaryProps {
  availableStocks: Stock[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ availableStocks }) => {
  const {
    holdings,
    totalValue,
    gainLoss,
    isLoading,
    error,
    loadPortfolio,
  } = usePortfolioStore();

  const [selectedSector, setSelectedSector] = useState<string>('All');

  useEffect(() => {
    loadPortfolio(availableStocks);
  }, [availableStocks, loadPortfolio]);

  const filteredHoldings =
    selectedSector === 'All'
      ? holdings
      : holdings.filter((s) => s.sector === selectedSector);

  if (isLoading) return <p>Loading portfolio...</p>;
  if (error) return <p>Error loading portfolio: {error}</p>;

  return (
    <div style={{ border: '1px solid #D1D5DB', borderRadius: 8, padding: 16 }}>
      <h2>Portfolio Summary</h2>

      <p>Total Value: ${totalValue.toLocaleString()}</p>

      <p style={{ color: gainLoss >= 0 ? 'green' : 'red' }}>
        Gain/Loss: ${gainLoss.toFixed(2)}
      </p>

      <select
        value={selectedSector}
        onChange={(e) => setSelectedSector(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Technology">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Automation">Automation</option>
      </select>

      <ul>
        {filteredHoldings.map((s) => (
          <li key={s.id}>
            {s.symbol}: ${s.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioSummary;