import { SORT_ICONS } from '../GoodsTable.constants';
import {
  getAriaSort,
  getHeaderClassName,
  getSortDirection,
} from '../lib/tableFormat';

export default function GoodsTableHeaderCell({ header, sort, onSort }) {
  const { label, key, sortable } = header;
  const SortIcon = sortable
    ? SORT_ICONS[getSortDirection(sort, key) || 'none']
    : null;

  const content = (
    <>
      {label}
      {SortIcon && (
        <span className="text-muted ms-1">
          <SortIcon />
        </span>
      )}
    </>
  );

  return (
    <th
      className={getHeaderClassName(header)}
      aria-sort={getAriaSort(sort, key)}
    >
      {sortable ? (
        <button
          type="button"
          className="goods-table__sort-btn"
          onClick={() => onSort(key)}
        >
          {content}
        </button>
      ) : (
        content
      )}
    </th>
  );
}
