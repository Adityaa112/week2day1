import React from 'react';
import { useHoldingsStore } from '../stores/useHoldingStore';

const HoldingsComparePanel: React.FC = () => {
  const { compareHoldings, clearHoldingCompare, toggleHoldingCompare } =
    useHoldingsStore();

  if (compareHoldings.length < 2) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '4px solid #6366F1',
        padding: '16px 24px',
        zIndex: 1100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Comparing Holdings</h3>
        <button
          onClick={clearHoldingCompare}
          style={{
            background: '#E0E7FF',
            border: 'none',
            padding: '6px 12px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Clear All
        </button>
      </div>

      <table style={{ width: '100%', marginTop: 12 }}>
        <thead>
          <tr>
            <th>Metric</th>
            {compareHoldings.map((h) => (
              <th key={h.id}>
                {h.symbol}
                <span
                  onClick={() => toggleHoldingCompare(h)}
                  style={{ marginLeft: 6, cursor: 'pointer' }}
                >
                  ✕
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Qty</td>
            {compareHoldings.map((h) => (
              <td key={h.id}>{h.qty}</td>
            ))}
          </tr>
          <tr>
            <td>Invested</td>
            {compareHoldings.map((h) => (
              <td key={h.id}>${h.investedValue.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Current</td>
            {compareHoldings.map((h) => (
              <td key={h.id}>${h.currentValue.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Return</td>
            {compareHoldings.map((h) => (
              <td
                key={h.id}
                style={{
                  color: h.totalReturn >= 0 ? '#166534' : '#991B1B',
                  fontWeight: 'bold',
                }}
              >
                {h.totalReturn >= 0 ? '+' : ''}
                ${h.totalReturn.toFixed(2)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsComparePanel;