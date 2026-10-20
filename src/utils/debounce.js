export function debounce(fn, delay) {
  let timerId;

  const debounced = (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timerId);

  return debounced;
}
