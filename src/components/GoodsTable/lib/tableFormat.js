export const EMPTY_CELL = '—';

export function nextSort(current, field) {
  if (current.field !== field) return { field, direction: 'asc' };
  if (current.direction === 'asc') return { field, direction: 'desc' };

  return { field: null, direction: null };
}

export function getSortDirection(sort, key) {
  return sort.field === key ? sort.direction : null;
}

export function getAriaSort(sort, key) {
  const direction = getSortDirection(sort, key);
  if (!direction) return undefined;

  return direction === 'asc' ? 'ascending' : 'descending';
}

export function getHeaderClassName({ key, sortable, align }) {
  return [
    'goods-table__header',
    `goods-table__header--${key}`,
    sortable && 'goods-table__header--sortable',
    align === 'end' && 'text-end',
  ]
    .filter(Boolean)
    .join(' ');
}

export function formatPrice(price) {
  return price !== null ? `${price.toFixed(2)} ₽` : EMPTY_CELL;
}
