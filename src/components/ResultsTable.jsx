import { useDispatch } from 'react-redux';
import { goBack } from '../store/search/searchSlice';
import GoodsTable from './GoodsTable/GoodsTable';

export default function ResultsTable({ brand, goods }) {
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
        <h5 className="mb-0">Производитель: {brand}</h5>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => dispatch(goBack())}
        >
          Назад к выбору производителя
        </button>
      </div>
      <GoodsTable goods={goods} />
    </div>
  );
}
