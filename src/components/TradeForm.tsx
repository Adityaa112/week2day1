import React, { useState } from 'react';
import type { Stock, Trade } from '../types/stock.types';

// Add 'id' to StockSummary so we can actually look it up
type StockSummary = Pick<Stock, 'id' | 'symbol' | 'name' | 'price' | 'sector'>;

type NewTradeInput = Omit<Trade, 'id' | 'date'>;

interface TradeFormProps {
    stocks: StockSummary[];
    onSubmitTrade: (trade: NewTradeInput) => void;
    initialValues?: Partial<Stock>;
}

const TradeForm: React.FC<TradeFormProps> = ({
    stocks,
    onSubmitTrade,
    initialValues = {},
}) => {
    // We cast this as NewTradeInput to ensure all required fields for a trade exist
    const [form, setForm] = useState<NewTradeInput>({
        stockId: initialValues.id ?? '',
        symbol: initialValues.symbol ?? '',
        type: 'BUY',
        quantity: 1,
        price: initialValues.price ?? 0,
    });

    const handelStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Find by symbol since that is what the <select> value is set to
        const selected = stocks.find(s => s.symbol === e.target.value);
        if (selected) {
            setForm(prev => ({
                ...prev,
                stockId: selected.id,
                symbol: selected.symbol,
                price: selected.price,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitTrade(form);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3>Place a Trade</h3>

            <select value={form.symbol} onChange={handelStockChange}>
                <option value="">Select a Stock</option>
                {stocks.map(s => (
                    // Using s.symbol as the value to match the state
                    <option key={s.id} value={s.symbol}>{s.symbol} - {s.name}</option>
                ))}
            </select>

            <div style={{ display: 'flex', gap: 8 }}>
                {(['BUY', 'SELL'] as const).map(t => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: t }))}
                        style={{
                            background: form.type === t ? '#1E40AF' : '#E5E7EB',
                            color: form.type === t ? 'white' : 'black',
                            padding: '6px 16px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div>
                <input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm(prev => ({ ...prev, quantity: Math.max(1, Number(e.target.value)) }))}
                    placeholder='Quantity'
                />

                <p>
                    Price: ${form.price.toFixed(2)} | Total: ${(form.price * form.quantity).toFixed(2)}
                </p>
                <button type="submit" disabled={!form.symbol}>Submit Trade</button>
            </div>
        </form>
    );
}

export default TradeForm;