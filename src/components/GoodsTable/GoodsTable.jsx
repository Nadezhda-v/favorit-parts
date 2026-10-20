import { useMemo, useState } from 'react';
import { buildRows, sortRows } from './lib/goods';
import { nextSort } from './lib/tableFormat';
import { GOODS_TABLE_HEADERS } from './GoodsTable.constants';
import { GoodsTableRow, GoodsTableHeaderCell } from './ui';
import './GoodsTable.scss';

export default function GoodsTable({ goods }) {
  const [sort, setSort] = useState({ field: null, direction: null });
  const [onlyAnalogues, setOnlyAnalogues] = useState(false);

  const rows = useMemo(() => {
    const built = buildRows(goods);
    return onlyAnalogues ? built.filter((row) => row.isAnalogue) : built;
  }, [goods, onlyAnalogues]);

  const sortedRows = useMemo(
    () => (sort.field ? sortRows(rows, sort.field, sort.direction) : rows),
    [rows, sort],
  );

  const handleSort = (field) => setSort((current) => nextSort(current, field));

  return (
    <div className="goods-table-wrapper">
      <div className="form-check goods-table__filter">
        <input
          id="only-analogues"
          type="checkbox"
          className="form-check-input"
          checked={onlyAnalogues}
          onChange={(event) => setOnlyAnalogues(event.target.checked)}
        />
        <label htmlFor="only-analogues" className="form-check-label">
          Показать только аналоги
        </label>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-striped table-hover align-middle goods-table mt-2">
          <thead>
            <tr>
              {GOODS_TABLE_HEADERS.map((header) => (
                <GoodsTableHeaderCell
                  key={header.key}
                  header={header}
                  sort={sort}
                  onSort={handleSort}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
              <GoodsTableRow
                key={`${row.good.number || 'row'}-${index}`}
                good={row.good}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
