import React from 'react';
import type { Holding, AllocationSlice } from '../../types/stock.types';

import DataTable from '../../components/DataTable';
import PortfolioAllocationPie from '../../components/PortfolioAllocationPie';
import { useHoldingsStore } from '../../stores/useHoldingStore';

function pnlCell(value: unknown): React.ReactNode {
  const numberValue = Number(value);
  const isPositive = numberValue >= 0;
  const color = isPositive ? '#166534' : '#991B1B';
  const prefix = isPositive ? '+' : '';

  return (
    <span style={{ color, fontWeight: 'bold' }}>
      {prefix}${numberValue.toFixed(2)}
    </span>
  );
}

const HoldingsFeature: React.FC = () => {
  // 🔹 Zustand is now the single source of truth
  const { holdings, compareHoldings, toggleHoldingCompare } =
    useHoldingsStore();

  // Used by the portfolio allocation pie
  const allocationData: AllocationSlice[] = holdings.map((h) => ({
    name: h.symbol,
    value: h.currentValue,
  }));

  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>

      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
          marginBottom: '32px',
        }}
      >
        {/* Allocation Pie */}
        <div style={{ flex: '0 0 360px' }}>
          <h3>Portfolio Allocation</h3>
          <PortfolioAllocationPie data={allocationData} />
        </div>

        {/* Holdings Table */}
        <div style={{ flex: 1 }}>
          <DataTable<Holding>
            data={holdings}
            rowKey="id"
            filterKey="symbol"
            columns={[
              // 🆕 Compare column
              {
                key: 'compare' as any,
                header: 'Compare',
                render: (_, holding) => {
                  const inCompare = compareHoldings.some(
                    (h) => h.id === holding.id
                  );

                  return (
                    <button
                      onClick={() => toggleHoldingCompare(holding)}
                      style={{
                        background: inCompare ? '#10B981' : '#E5E7EB',
                        color: inCompare ? '#fff' : '#374151',
                        border: 'none',
                        borderRadius: 4,
                        padding: '4px 10px',
                        cursor: 'pointer',
                      }}
                    >
                      {inCompare ? '✓' : '+'}
                    </button>
                  );
                },
              },

              {
                key: 'symbol',
                header: 'Symbol',
                sortable: true,
                render: (value) => <strong>{value}</strong>,
              },
              { key: 'qty', header: 'Qty', sortable: true },
              {
                key: 'investedValue',
                header: 'Invested Value',
                sortable: true,
                render: (val) => '$' + Number(val).toLocaleString(),
              },
              {
                key: 'currentValue',
                header: 'Current Value',
                sortable: true,
                render: (val) => '$' + Number(val).toLocaleString(),
              },
              {
                key: 'totalReturn',
                header: 'Total Return',
                sortable: true,
                render: (val) => pnlCell(val),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default HoldingsFeature;