import { useDispatch } from 'react-redux';
import { fetchOffers } from '../store/search/searchAction';

export default function BrandsList({ number, brands }) {
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <h5 className="mb-2">Производители для артикула {number}</h5>
      <div className="list-group">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => dispatch(fetchOffers({ number, brand }))}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}
