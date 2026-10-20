import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../store/search/searchAction';
import { useDebouncedCallback } from '../hooks/useDebouncedCallback';

export default function SearchForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const requestRef = useRef(null);

  const { call: search, cancel: cancelSearch } = useDebouncedCallback((number) => {
    requestRef.current?.abort();
    requestRef.current = dispatch(fetchBrands(number));
  }, 400);

  useEffect(() => () => requestRef.current?.abort(), []);

  const handleChange = (event) => {
    const number = event.target.value;
    setValue(number);

    if (!number.trim()) {
      cancelSearch();
      requestRef.current?.abort();
      return;
    }

    search(number.trim());
  };

  return (
    <div className="mb-4">
      <label htmlFor="part-number" className="form-label">
        Артикул
      </label>
      <input
        id="part-number"
        type="text"
        className="form-control"
        placeholder="Например: 0189"
        value={value}
        onChange={handleChange}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
}
