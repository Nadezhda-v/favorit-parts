import { SortAscIcon, SortDescIcon, SortNoneIcon } from '../icons';

export const GOODS_TABLE_HEADERS = [
  { key: 'number', label: 'Артикул' },
  { key: 'name', label: 'Наименование' },
  { key: 'brand', label: 'Производитель' },
  { key: 'price', label: 'Цена', align: 'end', sortable: true },
  { key: 'count', label: 'Остаток', align: 'end', sortable: true },
];

export const SORT_ICONS = {
  asc: SortAscIcon,
  desc: SortDescIcon,
  none: SortNoneIcon,
};

export const EMPTY_CELL = '—';
