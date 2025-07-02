import Image from "next/image";
import { NavDropdownMenu } from "./common/NavDropdownMenu";

export const TabNav = () => (
  <nav className="tab-nav bg-white flex items-center">
    <Image
      className="mx-auto"
      src="/favicon.svg"
      alt="Favicon"
      width={36}
      height={36}
    />
    <NavDropdownMenu
      title="選股"
      showTopBar={true}
      topBarText="選股功能總覽"
      columns={[
        ["自訂選股", "總優股清單", "轉機股清單"],
        ["月營收排行榜", "殖利率排行榜", "本益比排行榜", "毛利率排行榜"],
      ]}
    />
    <NavDropdownMenu
      title="產業"
      showTopBar={false}
      columns={[
        ["半導體", "綠能", "生技醫療"],
        ["金融保險", "運輸倉儲"],
      ]}
    />

    <NavDropdownMenu
      title="市場"
      showTopBar={false}
      columns={[["台股", "美股", "ETF"]]}
    />
  </nav>
);
