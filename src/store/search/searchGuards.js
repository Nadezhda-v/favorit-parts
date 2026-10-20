export function isStaleBrands(state, action) {
  return action.meta.arg !== state.number;
}

export function isStaleOffers(state, action) {
  return (
    action.meta.arg.number !== state.number ||
    action.meta.arg.brand !== state.selectedBrand
  );
}
