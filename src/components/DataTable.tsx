// src/components/DataTable.tsx
import React, { useState } from 'react';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number;
  sortable?: boolean;
}

interface DataTableProps<T extends object> {
  data?: T[]; // ✅ optional
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  filterKey?: keyof T;
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
  emptyMessage = 'No data available',
  filterKey,
}: DataTableProps<T>) {

  // ✅ HARD SAFETY NET
  const safeData: T[] = Array.isArray(data) ? data : [];

  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: null });
  const [filterText, setFilterText] = useState('');

  const handleSort = (key: keyof T) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sorted = [...safeData].sort((a, b) => {
    if (!sort.key || !sort.dir) return 0;
    const av = a[sort.key];
    const bv = b[sort.key];
    if (av < bv) return sort.dir === 'asc' ? -1 : 1;
    if (av > bv) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });

  const filtered =
    filterKey && filterText
      ? sorted.filter((row) =>
          String(row[filterKey])
            .toLowerCase()
            .includes(filterText.toLowerCase())
        )
      : sorted;

  if (safeData.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '20px' }}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <>
      {filterKey && (
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            placeholder={`Filter by ${String(filterKey)}...`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: 4,
              border: '1px solid #D1D5DB',
              width: 220,
            }}
          />
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                }}
              >
                {col.header}
                {col.sortable && (
                  <span style={{ marginLeft: 8 }}>
                    {sort.key === col.key
                      ? sort.dir === 'asc'
                        ? '▲'
                        : '▼'
                      : '⇅'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filtered.map((row, ri) => (
            <tr
              key={String(row[rowKey])}
              onClick={() => onRowClick?.(row)}
              style={{
                background: ri % 2 === 0 ? '#fff' : '#F8FAFC',
                cursor: onRowClick ? 'pointer' : 'default',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              {columns.map((column) => (
                <td key={String(column.key)} style={{ padding: 10 }}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DataTable;