import { buildRows, getCount, getPrice } from '../../utils/goods';
import { GOODS_TABLE_HEADERS } from './GoodsTable.constants';
import './GoodsTable.scss';

export default function GoodsTable({ goods }) {
  const rows = buildRows(goods);

  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped table-hover align-middle goods-table mt-2">
        <thead>
          <tr>
            {GOODS_TABLE_HEADERS.map((header) => (
              <th
                key={header.key}
                className={`goods-table__header goods-table__header--${header.key}${
                  header.align === 'end' ? ' text-end' : ''
                }`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const price = getPrice(row);
            return (
              <tr key={`${row.number || 'row'}-${index}`}>
                <td>{row.number || '—'}</td>
                <td>{row.name || '—'}</td>
                <td>{row.brand || '—'}</td>
                <td className="text-end">{price !== null ? `${price.toFixed(2)} ₽` : '—'}</td>
                <td className="text-end">{getCount(row)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
