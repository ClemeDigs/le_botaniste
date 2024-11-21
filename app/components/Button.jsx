export function Button({content, className, onClick = () => {}}) {
  return (
    <button
      className={`rounded bg-pink px-4 py-2 text-white hover:bg-green-900 hover:cursor-pointer transition ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
