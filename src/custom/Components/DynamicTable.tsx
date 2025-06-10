import React from 'react';

type Column = {
  name: string;
  key: string;
  hidden?: boolean;
};

type DynamicTableProps = {
  data: Record<string, any>[];
  columns: Column[];
  actionRowClick?: (rowData: Record<string, any>) => void;
};

const DynamicTable: React.FC<DynamicTableProps> = ({ data, columns, actionRowClick }) => {
  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <div className="h-full w-full overflow-auto">
      <table className="min-w-full h-full divide-y divide-gray-200 shadow-md rounded-md overflow-hidden bg-white px-2">
        <thead className="bg-blue-600 text-white">
          <tr>
            {visibleColumns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left text-sm font-semibold tracking-wider"
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={visibleColumns.length}
                className="text-center px-6 py-4 text-sm text-gray-500"
              >
                No data
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue-900 hover:text-white cursor-pointer transition"
                onClick={() => actionRowClick?.(row)}
              >
                {visibleColumns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-3 whitespace-nowrap text-sm"
                  >
                   { String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
