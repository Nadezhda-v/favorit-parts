export default function Loader() {
  return (
    <div className="d-flex align-items-center gap-2 text-muted my-4">
      <div className="spinner-border spinner-border-sm" role="status" />
      <span>Загрузка...</span>
    </div>
  );
}
