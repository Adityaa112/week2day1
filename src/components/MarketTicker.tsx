import React from 'react';
import type { MarketTicker } from '../types/stock.types';

interface Props {
  items: MarketTicker[];
}

const MarketTickerBar: React.FC<Props> = ({ items }) => {
  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        whiteSpace: 'nowrap',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          width: 'max-content',
          gap: '32px',
          padding: '8px 0',
          animation: 'ticker-scroll 30s linear infinite',
        }}
      >
        {[...items, ...items].map((item, index) => {
          const isPositive = item.changePct >= 0;
          const color = isPositive ? '#16A34A' : '#DC2626';
          const arrow = isPositive ? '▲' : '▼';

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
              }}
            >
              <strong>{item.name}</strong>
              <span>{item.value.toLocaleString()}</span>
              <span style={{ color }}>
                {arrow} {Math.abs(item.changePct)}%
              </span>
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes ticker-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default MarketTickerBar;