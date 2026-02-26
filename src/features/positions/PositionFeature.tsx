import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import { usePositionsStore } from '../../stores/usePositionStore';

const PositionsFeature: React.FC = () => {
  const { positions, togglePositionCompare, comparePositions, addPosition, removePosition } =
    usePositionsStore();

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ color: '#1E40AF' }}>Positions</h2>

      <DataTable<Position>
        data={positions}
        rowKey="id"
        filterKey="symbol"
        columns={[
          {
            key: 'compare' as any,
            header: 'Compare',
            render: (_, pos) => {
              const inCompare = comparePositions.some((p) => p.id === pos.id);
              return (
                <button
                  onClick={() => togglePositionCompare(pos)}
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
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Qty', sortable: true },
          {
            key: 'avgPrice',
            header: 'Avg Price',
            render: (v) => `$${Number(v).toFixed(2)}`,
          },
          {
            key: 'pnl',
            header: 'P&L',
            render: (v) => (
              <span
                style={{
                  color: Number(v) >= 0 ? '#166534' : '#991B1B',
                  fontWeight: 'bold',
                }}
              >
                {Number(v) >= 0 ? '+' : ''}${Number(v).toFixed(2)}
              </span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (_, pos) => (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => addPosition({ symbol: pos.symbol, qty: 1, avgPrice: pos.avgPrice + pos.avgPrice*0.05, ltp: pos.ltp, pnl: pos.pnl, pnlPct: pos.pnlPct })}
                  style={{ background: '#E0F2FE', color: '#0369A1', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}
                >
                  Add 
                </button>
                <button
                  onClick={() => removePosition(pos.id)}
                  style={{ background: '#FECACA', color: '#B91C1C', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default PositionsFeature;