import React from 'react';
import { usePositionsStore } from '../stores/usePositionStore';


const PositionComparePanel: React.FC = () => {
  const {
    comparePositions,
    clearPositionCompare,
    togglePositionCompare,
  } = usePositionsStore();

  // Show only if at least 2 positions are selected
  if (comparePositions.length < 2) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '4px solid #10B981',
        padding: '16px 24px',
        zIndex: 1100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        maxHeight: '35vh',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0, color: '#065F46' }}>
          Comparing {comparePositions.length} Positions
        </h3>

        <button
          onClick={clearPositionCompare}
          style={{
            background: '#DCFCE7',
            color: '#166534',
            border: 'none',
            padding: '6px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Clear All
        </button>
      </div>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#10B981', color: '#fff' }}>
            <th style={{ textAlign: 'left', padding: 10 }}>Metric</th>
            {comparePositions.map((p) => (
              <th key={p.id} style={{ padding: 10 }}>
                {p.symbol}
                <span
                  onClick={() => togglePositionCompare(p)}
                  style={{
                    cursor: 'pointer',
                    marginLeft: 8,
                    fontSize: 14,
                  }}
                >
                  ✕
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 10, fontWeight: 'bold' }}>Quantity</td>
            {comparePositions.map((p) => (
              <td key={p.id} style={{ textAlign: 'center' }}>
                {p.qty}
              </td>
            ))}
          </tr>

          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 10, fontWeight: 'bold' }}>Avg Price</td>
            {comparePositions.map((p) => (
              <td key={p.id} style={{ textAlign: 'center' }}>
                ${p.avgPrice.toFixed(2)}
              </td>
            ))}
          </tr>

          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 10, fontWeight: 'bold' }}>LTP</td>
            {comparePositions.map((p) => (
              <td key={p.id} style={{ textAlign: 'center' }}>
                ${p.ltp.toFixed(2)}
              </td>
            ))}
          </tr>

          <tr>
            <td style={{ padding: 10, fontWeight: 'bold' }}>Profit / Loss</td>
            {comparePositions.map((p) => {
              const positive = p.pnl >= 0;
              return (
                <td
                  key={p.id}
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: positive ? '#166534' : '#991B1B',
                    backgroundColor: positive ? '#F0FDF4' : '#FEF2F2',
                  }}
                >
                  {positive ? '+' : ''}${p.pnl.toFixed(2)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PositionComparePanel;