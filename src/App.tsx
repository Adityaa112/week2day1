import { useState } from 'react';

// Types
import type { Position, Stock, Trade, Holding } from './types/stock.types';

// Data
import { holdings, positions, stocks, trades } from './data/stockData';

// Components
import StockCard from './components/StockCard';
import PortfolioSummary from './components/PortfolioSummary';
import SearchBar from './components/SearchBar';
import DataTable from './components/DataTable';
import TradeForm from './components/TradeForm';
import TradeFeature from './features/trades/TradeFeature'; // NEW
import LiveQuotesFeature from './features/quotes/LiveQuotesFeature'; // NEW
import PositionsFeature from './features/positions/PositionsFeature'; // NEW

function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [tradeHistory, setTradeHistory] = useState<Trade[]>(trades);

  // Filter stocks based on search and sector
  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = !sectorFilter || s.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  // Add a new trade
  const handleNewTrade = (input: Omit<Trade, 'id' | 'date'>) => {
    const newTrade: Trade = {
      ...input,
      id: `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(prev => [newTrade, ...prev]);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>

      <SearchBar
        onSearch={setSearchQuery}
        onFilterChange={setSectorFilter}
        placeholder='Search by symbol or name...'
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {filteredStocks.map(stock => (
          <StockCard
            key={stock.id}
            stock={stock}
            isSelected={selectedStock?.id === stock.id}
            onSelect={setSelectedStock}
          />
        ))}
      </div>

      <PortfolioSummary availableStocks={stocks} />

      {/* Live Quotes Feature with Virtual List */}
      <LiveQuotesFeature
        stocks={filteredStocks}
        selectedStock={selectedStock}
        onSelectStock={setSelectedStock}
        onSearch={setSearchQuery}
        onFilterChange={setSectorFilter}
      />

      {/* Trade History Feature with Infinite Scroll */}
      <TradeFeature
        tradeHistory={tradeHistory}
        stocks={stocks}
        selectedStock={selectedStock}
        onSubmitTrade={handleNewTrade}
      />

      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>
      <DataTable<Holding>
        data={holdings}
        rowKey='id'
        filterKey='symbol' // search input filters by symbol
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Qty', sortable: true },
          { key: 'investedValue', header: 'Invested Value', sortable: true,
            render: v => `$${Number(v).toLocaleString()}` },
          { key: 'currentValue', header: 'Current Value', sortable: true,
            render: v => `$${Number(v).toLocaleString()}` },
          { key: 'totalReturn', header: 'Total Return', sortable: true,
            render: v => {
              const n = Number(v);
              return <span style={{ color: n >= 0 ? '#166534' : '#991B1B', fontWeight: 'bold' }}>
                {n >= 0 ? '+' : ''}${n.toFixed(2)}
              </span>;
            }},
        ]}
      />

      {/* POSITIONS TABLE - Infinite Scroll Feature */}
      <PositionsFeature />

      <h2 style={{ color: '#1E40AF' }}>New Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={handleNewTrade}
        initialValues={selectedStock ?? {}}
      />
    </div>
  );
}

export default App;