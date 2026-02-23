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

      {/* Live Quotes Table - Sorting enabled on Price and Change */}
      <h2 style={{ color: '#1E40AF' }}>Live Quotes</h2>
      <DataTable<Stock>
        data={filteredStocks}
        rowKey='id'
        onRowClick={setSelectedStock}
        emptyMessage='No stocks match your search.'
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'name', header: 'Company', sortable: true },
          { key: 'price', header: 'Price', sortable: true,
            render: v => `$${Number(v).toFixed(2)}` },
          { key: 'changePct', header: 'Change %', sortable: true,
            render: v => {
              const n = Number(v);
              return <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                {n >= 0 ? '+' : ''}{n.toFixed(2)}%
              </span>;
            }},
          { key: 'volume', header: 'Volume', sortable: true,
            render: v => Number(v).toLocaleString() },
        ]}
      />

      {/* Trade History Table */}
      <h2 style={{ color: '#1E40AF' }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory}
        rowKey='id'
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'type', header: 'Type', sortable: true,
            render: v => <strong style={{ color: v === 'BUY' ? 'green' : 'red' }}>{String(v)}</strong> },
          { key: 'quantity', header: 'Qty', sortable: true },
          { key: 'price', header: 'Price', sortable: true,
            render: v => `$${Number(v).toFixed(2)}` },
          { key: 'date', header: 'Date', sortable: true },
        ]}
      />

      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>
      <DataTable<Holding>
        data={holdings}
        rowKey='id'
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

      {/* POSITIONS TABLE - Full sorting logic applied here */}
      <h2 style={{ color: '#1E40AF' }}>Positions</h2>
      <DataTable<Position>
        data={positions}
        rowKey='id'
        columns={[
          { key: 'symbol',   header: 'Symbol',    sortable: true },
          { key: 'qty',      header: 'Qty',       sortable: true },
          { key: 'avgPrice', header: 'Avg Price', sortable: true,
            render: v => `$${Number(v).toFixed(2)}` },
          { key: 'ltp',      header: 'LTP',       sortable: true,
            render: v => `$${Number(v).toFixed(2)}` },
          { key: 'pnl',      header: 'P&L',       sortable: true,
            render: (v) => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? '#166534' : '#991B1B', fontWeight: 'bold' }}>
                  {n >= 0 ? '+' : ''}${n.toFixed(2)}
                </span>
              );
            }
          },
          { key: 'pnlPct',   header: 'P&L %',     sortable: true,
            render: (v) => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? '#166534' : '#991B1B' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(2)}%
                </span>
              );
            }
          },
        ]}
      />

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