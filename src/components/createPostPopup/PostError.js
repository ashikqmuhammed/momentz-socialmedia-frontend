export default function PostError({ error, setError }) {
  return (
    <div className="postError">
      <div className="postError_error">{error}</div>
      <button
        onClick={() => {
          setError("");
        }}
        className="blue_btn"
      >
        Try again
      </button>
    </div>
  );
}
