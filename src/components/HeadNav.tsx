import { Search } from "./Search";
import { TabNav } from "./TabNav";
import { UserTools } from "./UserTools";

export const HeadNav = () => (
  <div className="flex items-center justify-center h-[58px] w-full bg-white border-b border-[#e9e9e9] max-len">
    <div className="max-w-7xl h-full flex">
      <TabNav></TabNav>
      <Search></Search>
      <UserTools></UserTools>
    </div>
  </div>
);
