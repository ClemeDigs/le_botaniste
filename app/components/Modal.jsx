export default function Modal({
  isVisible = false,
  setIsVisible = () => {},
  children,
}) {
  return (
    <div
      className={`${
        isVisible ? '' : 'hidden'
      } w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center`}
    >
      <div className="w-full max-w-[550px] min-h-[300px] bg-white grid gap-3 p-3">
        <div className="flex justify-end">
          <button
            onClick={() => {
              setIsVisible(false);
            }}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
