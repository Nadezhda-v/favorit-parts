export function getPrice(good) {
  const prices = (good.warehouses || [])
    .map((warehouse) => parseFloat(warehouse.price))
    .filter((price) => !Number.isNaN(price));
  return prices.length > 0 ? Math.min(...prices) : null;
}

export function getCount(good) {
  if (good.count !== undefined && good.count !== null) {
    return good.count;
  }
  return (good.warehouses || []).reduce(
    (sum, warehouse) => sum + (parseFloat(warehouse.stock) || 0),
    0,
  );
}

export function buildRows(goods) {
  return goods.flatMap((good) => [
    { good, isAnalogue: false },
    ...(good.analogues || []).map((analogue) => ({
      good: analogue,
      isAnalogue: true,
    })),
  ]);
}

function getSortValue(row, field) {
  return field === 'price' ? getPrice(row.good) : getCount(row.good);
}

export function sortRows(rows, field, direction) {
  return [...rows].sort((a, b) => {
    const valueA = getSortValue(a, field);
    const valueB = getSortValue(b, field);

    if (valueA === null && valueB === null) return 0;
    if (valueA === null) return 1;
    if (valueB === null) return -1;

    return direction === 'asc' ? valueA - valueB : valueB - valueA;
  });
}
