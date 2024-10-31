export default function SearchBar({onSearch = () => {}}) {
  return (
    <div className="flex gap-4 items-center">
      <label htmlFor="search">Search</label>
      <input type="text" id="search" name="search" onInput={onSearch} />
    </div>
  );
}
