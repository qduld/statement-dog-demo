import SettingsIcon from "@mui/icons-material/Settings";
import { NavDropdownMenu } from "./common/NavDropdownMenu";

export const UserTools = () => (
  <nav className="tab-nav bg-white flex items-center ml-20">
    <NavDropdownMenu
      title=" 我的追蹤"
      isSelect={false}
      showTopBar={false}
      topBarText=""
      columns={[]}
    />
    <NavDropdownMenu
      title=" 通知"
      isSelect={false}
      showTopBar={false}
      columns={[
        ["半導體", "綠能", "生技醫療"],
        ["金融保險", "運輸倉儲"],
      ]}
    />

    <NavDropdownMenu
      title={<SettingsIcon></SettingsIcon>}
      showTopBar={false}
      columns={[["帳號設定", "付款設定", "重設密碼", " 登出 "]]}
    />
  </nav>
);
