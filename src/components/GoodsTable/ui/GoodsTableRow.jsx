import { getCount, getPrice } from '../lib/goods';
import { EMPTY_CELL, formatPrice } from '../lib/tableFormat';

export default function GoodsTableRow({ good }) {
  return (
    <tr>
      <td>{good.number || EMPTY_CELL}</td>
      <td>{good.name || EMPTY_CELL}</td>
      <td>{good.brand || EMPTY_CELL}</td>
      <td className="text-end">{formatPrice(getPrice(good))}</td>
      <td className="text-end">{getCount(good)}</td>
    </tr>
  );
}
