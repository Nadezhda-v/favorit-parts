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
    0
  );
}

export function buildRows(goods) {
  const rows = [];
  goods.forEach((good) => {
    rows.push(good);
    rows.push(...(good.analogues || []));
  });
  return rows;
}
