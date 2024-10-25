export function Button({content, className, onClick = () => {}}) {
  return (
    <button
      className={`rounded bg-green-800 px-4 py-2 text-white hover:bg-green-900 hover:cursor-pointer transition ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
