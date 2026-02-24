import React from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import DataTable from "../../components/DataTable";
import type { Position } from "../../types/stock.types";
import { positions } from "../../data/stockData";

const PositionsFeature: React.FC = () => {
	const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(positions, 5);
	return (
		<div>
			<h2 style={{ color: '#1E40AA' }}>Positions</h2>
			<DataTable<Position>
				data={visibleItems}
				rowKey="id"
				filterKey="symbol"
				columns={[
					{ key: 'symbol',   header: 'Symbol',    sortable: true },
					{ key: 'qty',      header: 'Qty',       sortable: true },
					{ key: 'avgPrice', header: 'Avg Price', sortable: true,
						render: v => `$${Number(v).toFixed(2)}` },
					{ key: 'ltp',      header: 'LTP',       sortable: true,
						render: v => `$${Number(v).toFixed(2)}` },
					{ key: 'pnl',      header: 'P&L',       sortable: true,
						render: (v) => {
							const n = Number(v);
							return (
								<span style={{ color: n >= 0 ? '#166534' : '#991B1B', fontWeight: 'bold' }}>
									{n >= 0 ? '+' : ''}${n.toFixed(2)}
								</span>
							);
						}
					},
					{ key: 'pnlPct',   header: 'P&L %',     sortable: true,
						render: (v) => {
							const n = Number(v);
							return (
								<span style={{ color: n >= 0 ? '#166534' : '#991B1B' }}>
									{n >= 0 ? '+' : ''}{n.toFixed(2)}%
								</span>
							);
						}
					},
				]}
			/>
			<div ref={bottomRef} style={{ height: 1 }} />
			{hasMore && (
				<p style={{ textAlign: 'center', color: '#6B7280', padding: '8px 0' }}>
					Scroll down to see more positions...
				</p>
			)}
			{!hasMore && positions.length > 0 && (
				<p style={{ textAlign: 'center', color: '#9CA3AF', padding: '8px 0' }}>
					All {positions.length} positions loaded
				</p>
			)}
		</div>
	);
};

export default PositionsFeature;