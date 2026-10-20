import { useSelector } from 'react-redux';
import SearchForm from '../components/SearchForm';
import BrandsList from '../components/BrandsList';
import ResultsTable from '../components/ResultsTable';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function SearchPage() {
  const { number, brands, selectedBrand, goods, loading, error } = useSelector(
    (state) => state.search,
  );

  return (
    <div className="container app-container py-4">
      <h1 className="h4 mb-4">Поиск запчастей и аналогов</h1>
      <SearchForm />
      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && selectedBrand && (
        <ResultsTable brand={selectedBrand} goods={goods} />
      )}
      {!loading && !selectedBrand && brands.length > 0 && (
        <BrandsList number={number} brands={brands} />
      )}
    </div>
  );
}
