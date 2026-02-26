import { lazy, useState } from 'react';

// ── Data ─────────────────────────────────────────────
import { stocks } from './data/stockData';
import { marketTickers } from './data/marketTicker';

// ── Types ────────────────────────────────────────────
import type { Stock } from './types/stock.types';

// ── Core UI (EAGER) ──────────────────────────────────
import SuspenseBoundary from './boundaries/SuspenseBoundary';
import TableSkeleton from './skeletons/TableSkeleton';
import CardGridSkeleton from './skeletons/CardGridSkeleton';
import FormSkeleton from './skeletons/FormSkeleton';
import MarketTickerBar from './components/MarketTicker';
import StockComparePanel from './components/StockComparePanel';
import PositionComparePanel from './components/PositionComparePanel';
import HoldingsComparePanel from './components/HoldingsComparePanel';

// ── Features (LAZY) ──────────────────────────────────
const LiveQuotesFeature = lazy(() =>
  import('./features/quotes/LiveQuotesFeature')
);

const PortfolioFeature = lazy(() =>
  import('./features/portfolio/PortfolioFeature')
);

const PositionFeature = lazy(() =>
  import('./features/positions/PositionFeature')
);

const HoldingsFeature = lazy(() =>
  import('./features/holdings/HoldingsFeature')
);

const TradeFeature = lazy(() =>
  import('./features/trades/TradeFeature')
);


function App() {
  // ── State ─────────────────────────────────────────
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');

  // ── Derived Data ──────────────────────────────────
  const filteredStocks = stocks.filter((stock) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      stock.symbol.toLowerCase().includes(q) ||
      stock.name.toLowerCase().includes(q);
    const matchesSector =
      sectorFilter === '' || stock.sector === sectorFilter;

    return matchesSearch && matchesSector;
  });

  // ── Handlers ──────────────────────────────────────

  return (
    <>
      {/* Market Ticker */}
      <MarketTickerBar items={marketTickers} />

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 24,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>

        {/* Live Quotes */}
        <SuspenseBoundary
          fallback={
            <>
              <CardGridSkeleton count={filteredStocks.length || 3} />
              <TableSkeleton rows={5} cols={6} title="Live Quotes" />
            </>
          }
        >
          <LiveQuotesFeature
            stocks={filteredStocks}
            selectedStock={selectedStock}
            onSelectStock={setSelectedStock}
            onSearch={setSearchQuery}
            onFilterChange={setSectorFilter}
          />
        </SuspenseBoundary>

        {/* Portfolio */}
        <SuspenseBoundary
          fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}
        >
          <PortfolioFeature />
        </SuspenseBoundary>

        {/* Positions — Zustand controlled */}
        <SuspenseBoundary
          fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}
        >
          <PositionFeature />
        </SuspenseBoundary>

        {/* Holdings */}
        <SuspenseBoundary
          fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}
        >
          <HoldingsFeature />
        </SuspenseBoundary>

        {/* Trades */}
        <SuspenseBoundary
          fallback={
            <>
              <TableSkeleton rows={3} cols={5} title="Trade History" />
              <FormSkeleton />
            </>
          }
        >
          <TradeFeature
            stocks={stocks}
            selectedStock={selectedStock}
          />
        </SuspenseBoundary>

        {/* Floating Compare Panels */}
        <StockComparePanel />
        <PositionComparePanel />
        <HoldingsComparePanel />
      </div>
    </>
  );
}

export default App;