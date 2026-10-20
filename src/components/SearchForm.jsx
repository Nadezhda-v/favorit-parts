import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../store/search/searchAction';
import { debounce } from '../utils/debounce';

export default function SearchForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const search = useMemo(
    () => debounce((number) => dispatch(fetchBrands(number)), 400),
    [dispatch]
  );

  useEffect(() => () => search.cancel(), [search]);

  const handleChange = (event) => {
    const number = event.target.value;
    setValue(number);

    if (!number.trim()) {
      search.cancel();
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
      />
    </div>
  );
}
