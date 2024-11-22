export default function SearchBar({onSearch = () => {}}) {
  return (
    <div className="flex gap-3 items-center pb-3">
      <label htmlFor="search">Recherche :</label>
      <input
        type="text"
        id="search"
        name="search"
        onInput={onSearch}
        className=" bg-offWhite border border-dark-green rounded-full p-1 w-[250px]"
      />
    </div>
  );
}
