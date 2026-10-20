export default function ErrorMessage({ message }) {
  return (
    <div className="alert alert-danger my-4" role="alert">
      {message}
    </div>
  );
}
