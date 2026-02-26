import React from 'react';
import type { Trade, Stock } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import TradeForm from '../../components/TradeForm';
import { useTradeStore } from '../../stores/useTradeStore';

type NewTradeInput = Omit<Trade, 'id' | 'date'>;

interface TradeFeatureProps {
  stocks: Stock[];
  selectedStock: Stock | null;
}

const TradeFeature: React.FC<TradeFeatureProps> = ({
  stocks,
  selectedStock,
}) => {
  const tradeHistory = useTradeStore((s) => s.tradeHistory);
  const addTrade = useTradeStore((s) => s.addTrade);

  return (
    <>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Trade History</h2>

      <DataTable<Trade>
        data={tradeHistory}
        rowKey="id"
        filterKey="symbol"
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          {
            key: 'type',
            header: 'Type',
            render: (value) => {
              const isBuy = value === 'BUY';
              const colour = isBuy ? '#166534' : '#991B1B';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            },
          },
          { key: 'quantity', header: 'Qty', sortable: true },
          {
            key: 'price',
            header: 'Price',
            sortable: true,
            render: (value) => '$' + Number(value).toFixed(2),
          },
          { key: 'date', header: 'Date', sortable: true },
        ]}
      />

      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>

      <TradeForm
        stocks={stocks}
        initialValues={selectedStock ?? {}}
        onSubmitTrade={(input: NewTradeInput) => addTrade(input)}
      />
    </>
  );
};

export default TradeFeature; // REQUIRED for React.lazy()