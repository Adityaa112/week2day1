import React, { useState } from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number;
  sortable?: boolean; // NEW — opt-in per column
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

type SortDir = 'asc' | 'desc' | null;

interface SortState<T> {
  key: keyof T | null;
  dir: SortDir;
}

function DataTable<T extends object>({ 
  data, 
  columns, 
  rowKey, 
  onRowClick, 
  emptyMessage = "No data available" 
}: DataTableProps<T>) {
  
  // State to track current sorting
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: null });

  // Toggle logic: asc -> desc -> asc
  const handleSort = (key: keyof T) => {
    setSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Sort logic: Returns a new array to keep the original data pure
  const sortedData = [...data].sort((a, b) => {
    if (!sort.key || !sort.dir) return 0;
    
    const av = a[sort.key];
    const bv = b[sort.key];

    if (av < bv) return sort.dir === 'asc' ? -1 : 1;
    if (av > bv) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });

  if (data.length === 0) {
    return <p style={{ textAlign: 'center', padding: '20px' }}>{emptyMessage}</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && handleSort(col.key)}
              style={{
                padding: 10,
                textAlign: 'left',
                cursor: col.sortable ? 'pointer' : 'default',
                background: '#1E3A8A',
                color: '#fff',
                userSelect: 'none',
                width: col.width,
              }}
            >
              {col.header}
              {/* Visual feedback for sorting */}
              {col.sortable && (
                <span style={{ marginLeft: '8px', opacity: sort.key === col.key ? 1 : 0.3 }}>
                  {sort.key === col.key 
                    ? (sort.dir === 'asc' ? '▲' : '▼') 
                    : '⇅'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedData.map((row, ri) => (
          <tr
            key={String(row[rowKey])}
            onClick={() => onRowClick?.(row)}
            style={{
              background: ri % 2 === 0 ? '#fff' : '#F8fAFC',
              cursor: onRowClick ? 'pointer' : 'default',
              borderBottom: '1px solid #e2e8f0'
            }}
          >
            {columns.map((column) => (
              <td key={String(column.key)} style={{ padding: '10px' }}>
                {column.render 
                  ? column.render(row[column.key], row) 
                  : String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;