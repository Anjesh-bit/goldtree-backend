import MatchView from "./MatchView";
import SearchHeader from "./SearchHeader";
import SearchSider from "./SearchSider";

const Search = () => {
  return (
    <div className="grid grid-cols-12 px-[50px] py-8 gap-y-[24px]">
      <div className="col-span-12">
        <div className="w-[60%]">
          <SearchHeader />
        </div>
      </div>
      <div className="col-span-4">
        <SearchSider />
      </div>
      <div className="col-span-8 text-center">
        <MatchView />
      </div>
    </div>
  );
};

export default Search;
