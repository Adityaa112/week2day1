import React from 'react';
import type { Holding, AllocationSlice } from '../../types/stock.types';

import DataTable from '../../components/DataTable';
import PortfolioAllocationPie from '../../components/PortfolioAllocationPie';

interface HoldingsFeatureProps {
  holdings: Holding[];
}

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

const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {

  // 🔹 Chart data from holdings
  const allocationData: AllocationSlice[] = holdings.map((h) => ({
    name: h.symbol,
    value: h.currentValue,
  }));

  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>

      {/* 🔸 Chart + Table Container */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
          marginBottom: '32px',
        }}
      >
        {/* Pie Chart */}
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
              { key: 'symbol', header: 'Symbol', sortable: true },
              { key: 'qty', header: 'Qty', sortable: true },
              {
                key: 'investedValue',
                header: 'Invested Value',
                sortable: true,
                render: (value) => '$' + Number(value).toLocaleString(),
              },
              {
                key: 'currentValue',
                header: 'Current Value',
                sortable: true,
                render: (value) => '$' + Number(value).toLocaleString(),
              },
              {
                key: 'totalReturn',
                header: 'Total Return',
                sortable: true,
                render: (value) => pnlCell(value),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default HoldingsFeature;