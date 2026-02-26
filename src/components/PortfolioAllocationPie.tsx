import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { AllocationSlice } from '../types/stock.types';
import { useEffect, useRef, useState } from 'react';

interface Props {
  data: AllocationSlice[];
}

const COLORS = ['#2563EB', '#16A34A', '#DC2626', '#CA8A04', '#7C3AED'];

const PortfolioAllocationPie: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for layout to stabilize
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: 300 }}
    >
      {ready && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label={({ name, percent }) =>
                percent !== undefined
                  ? `${name} ${(percent * 100).toFixed(1)}%`
                  : name
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) =>
                typeof value === 'number'
                  ? `$${value.toLocaleString()}`
                  : value
              }
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PortfolioAllocationPie;