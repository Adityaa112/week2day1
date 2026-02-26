import type { Stock, Trade } from '../types/stock.types';
import type { Holding } from '../types/stock.types';
import type { Position } from '../types/stock.types';



export const stocks: Stock[] = [
    {
        id: '1', symbol: 'AAPL', name: 'Apple Inc.',
        price: 189.30, change: 2.15, changePct: 1.15,
        volume: 54_200_000, marketCap: 2_950_000_000_000, sector: 'Technology'
    },
    {
        id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.',
        price: 141.80, change: -0.95, changePct: -0.67,
        volume: 22_300_000, marketCap: 1_770_000_000_000, sector: 'Technology'
    },
    {
        id: '3', symbol: 'MSFT', name: 'Microsoft Corp.',
        price: 378.90, change: 4.20, changePct: 1.12,
        volume: 19_600_000, marketCap: 2_810_000_000_000, sector: 'Technology'
    },
    {
        id: '4', symbol: 'TSLA', name: 'Tesla Inc.',
        price: 248.50, change: -7.30, changePct: -2.85,
        volume: 98_700_000, marketCap: 791_000_000_000, sector: 'Automotive'
    },
    {
        id: '5', symbol: 'JPM', name: 'JPMorgan Chase',
        price: 196.40, change: 1.05, changePct: 0.54,
        volume: 8_900_000, marketCap: 568_000_000_000, sector: 'Finance'
    },
    // Duplicated stocks for virtualization demo
    ...Array.from({ length: 45 }, (_, i) => {
        const base = [
            {
                name: 'Apple Inc.', price: 189.30, change: 2.15, changePct: 1.15,
                volume: 54_200_000, marketCap: 2_950_000_000_000, sector: 'Technology'
            },
            {
                name: 'Alphabet Inc.', price: 141.80, change: -0.95, changePct: -0.67,
                volume: 22_300_000, marketCap: 1_770_000_000_000, sector: 'Technology'
            },
            {
                name: 'Microsoft Corp.', price: 378.90, change: 4.20, changePct: 1.12,
                volume: 19_600_000, marketCap: 2_810_000_000_000, sector: 'Technology'
            },
            {
                name: 'Tesla Inc.', price: 248.50, change: -7.30, changePct: -2.85,
                volume: 98_700_000, marketCap: 791_000_000_000, sector: 'Automotive'
            },
            {
                name: 'JPMorgan Chase', price: 196.40, change: 1.05, changePct: 0.54,
                volume: 8_900_000, marketCap: 568_000_000_000, sector: 'Finance'
            }
        ];
        const idx = i % 5;
        return {
            id: `stock${6 + i}`,
            symbol: `${['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'JPM'][idx]}${2 + Math.floor(i / 5)}`,
            ...base[idx]
        };
    })
];

export const trades: Trade[] = [
    {
        id: 't1', stockId: '1', symbol: 'AAPL', type: 'BUY',
        quantity: 10, price: 175.00, date: '2024-01-15'
    },
    {
        id: 't2', stockId: '3', symbol: 'MSFT', type: 'BUY',
        quantity: 5, price: 360.00, date: '2024-02-20'
    },
    {
        id: 't3', stockId: '4', symbol: 'TSLA', type: 'SELL',
        quantity: 8, price: 265.00, date: '2024-03-10'
    },
    { id: 't4', stockId: '2', symbol: 'GOOGL', type: 'BUY', quantity: 12, price: 140.00, date: '2024-01-18' },
    { id: 't5', stockId: '5', symbol: 'JPM', type: 'SELL', quantity: 7, price: 195.00, date: '2024-01-22' },
    { id: 't6', stockId: '1', symbol: 'AAPL', type: 'SELL', quantity: 4, price: 180.00, date: '2024-02-01' },
    { id: 't7', stockId: '3', symbol: 'MSFT', type: 'BUY', quantity: 3, price: 370.00, date: '2024-02-05' },
    { id: 't8', stockId: '4', symbol: 'TSLA', type: 'BUY', quantity: 6, price: 250.00, date: '2024-02-10' },
    { id: 't9', stockId: '2', symbol: 'GOOGL', type: 'SELL', quantity: 5, price: 142.00, date: '2024-02-15' },
    { id: 't10', stockId: '5', symbol: 'JPM', type: 'BUY', quantity: 10, price: 192.00, date: '2024-02-18' },
    { id: 't11', stockId: '1', symbol: 'AAPL', type: 'BUY', quantity: 8, price: 176.00, date: '2024-02-22' },
    { id: 't12', stockId: '3', symbol: 'MSFT', type: 'SELL', quantity: 2, price: 375.00, date: '2024-02-25' },
    { id: 't13', stockId: '4', symbol: 'TSLA', type: 'SELL', quantity: 7, price: 255.00, date: '2024-03-01' },
    { id: 't14', stockId: '2', symbol: 'GOOGL', type: 'BUY', quantity: 9, price: 143.00, date: '2024-03-05' },
    { id: 't15', stockId: '5', symbol: 'JPM', type: 'SELL', quantity: 6, price: 194.00, date: '2024-03-08' },
    { id: 't16', stockId: '1', symbol: 'AAPL', type: 'SELL', quantity: 5, price: 182.00, date: '2024-03-12' },
    { id: 't17', stockId: '3', symbol: 'MSFT', type: 'BUY', quantity: 4, price: 365.00, date: '2024-03-15' },
    { id: 't18', stockId: '4', symbol: 'TSLA', type: 'BUY', quantity: 10, price: 249.00, date: '2024-03-18' },
];

export const holdings: Holding[] = [
    { id: 'h1', symbol: 'AAPL', qty: 10, investedValue: 1750.00, currentValue: 1893.00, totalReturn: 143.00 },
    { id: 'h2', symbol: 'MSFT', qty: 5, investedValue: 1800.00, currentValue: 1894.50, totalReturn: 94.50 },
    { id: 'h3', symbol: 'TSLA', qty: 8, investedValue: 2120.00, currentValue: 1988.00, totalReturn: -132.00 },
    { id: 'h4', symbol: 'GOOGL', qty: 15, investedValue: 2175.00, currentValue: 2127.00, totalReturn: -48.00 },
    { id: 'h5', symbol: 'JPM', qty: 20, investedValue: 3840.00, currentValue: 3928.00, totalReturn: 88.00 },
    { id: 'h6', symbol: 'AMZN', qty: 12, investedValue: 3400.00, currentValue: 3550.00, totalReturn: 150.00 },
    { id: 'h7', symbol: 'NFLX', qty: 7, investedValue: 2800.00, currentValue: 2900.00, totalReturn: 100.00 },
    { id: 'h8', symbol: 'NVDA', qty: 9, investedValue: 4000.00, currentValue: 4200.00, totalReturn: 200.00 },
    { id: 'h9', symbol: 'META', qty: 6, investedValue: 1500.00, currentValue: 1600.00, totalReturn: 100.00 },
    { id: 'h10', symbol: 'BABA', qty: 11, investedValue: 2200.00, currentValue: 2100.00, totalReturn: -100.00 },
    { id: 'h11', symbol: 'ORCL', qty: 13, investedValue: 2600.00, currentValue: 2700.00, totalReturn: 100.00 },
    { id: 'h12', symbol: 'INTC', qty: 14, investedValue: 1400.00, currentValue: 1350.00, totalReturn: -50.00 },
    { id: 'h13', symbol: 'CSCO', qty: 16, investedValue: 3200.00, currentValue: 3300.00, totalReturn: 100.00 },
    { id: 'h14', symbol: 'ADBE', qty: 4, investedValue: 2000.00, currentValue: 2100.00, totalReturn: 100.00 },
    { id: 'h15', symbol: 'CRM', qty: 8, investedValue: 1600.00, currentValue: 1700.00, totalReturn: 100.00 },
];

export const positions: Position[] = [
    {
        id: 'p1', symbol: 'AAPL', qty: 10,
        avgPrice: 175.00, ltp: 189.30,
        pnl: 143.00, pnlPct: 8.17
    },
    {
        id: 'p2', symbol: 'MSFT', qty: 5,
        avgPrice: 360.00, ltp: 378.90,
        pnl: 94.50, pnlPct: 5.25
    },
    {
        id: 'p3', symbol: 'TSLA', qty: 8,
        avgPrice: 265.00, ltp: 248.50,
        pnl: -132.00, pnlPct: -6.23
    },
    {
        id: 'p4', symbol: 'GOOGL', qty: 15,
        avgPrice: 145.00, ltp: 141.80,
        pnl: -48.00, pnlPct: -2.21
    },
    {
        id: 'p5', symbol: 'JPM', qty: 20,
        avgPrice: 192.00, ltp: 196.40,
        pnl: 88.00, pnlPct: 2.29
    },
    // Dummy positions for infinite scroll demo
    ...Array.from({ length: 30 }, (_, i) => {
        const base = [
            { symbol: 'AAPL', avgPrice: 175.00, ltp: 189.30 },
            { symbol: 'MSFT', avgPrice: 360.00, ltp: 378.90 },
            { symbol: 'TSLA', avgPrice: 265.00, ltp: 248.50 },
            { symbol: 'GOOGL', avgPrice: 145.00, ltp: 141.80 },
            { symbol: 'JPM', avgPrice: 192.00, ltp: 196.40 }
        ];
        const idx = i % 5;
        const qty = 5 + (i % 10);
        const avgPrice = base[idx].avgPrice + (i % 3) * 2;
        const ltp = base[idx].ltp + ((i % 4) - 2) * 1.5;
        const pnl = (ltp - avgPrice) * qty;
        const pnlPct = ((ltp - avgPrice) / avgPrice) * 100;
        return {
            id: `p${6 + i}`,
            symbol: `${base[idx].symbol}${2 + Math.floor(i / 5)}`,
            qty,
            avgPrice,
            ltp,
            pnl: Number(pnl.toFixed(2)),
            pnlPct: Number(pnlPct.toFixed(2))
        };
    })

    
];
