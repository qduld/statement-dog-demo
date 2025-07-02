import { HeadNav } from "@/components/HeadNav";
import ProgressTracker, { TaskStep } from "@/components/ProgressTracker";
import SideNav from "@/components/SideNav";

export default async function Layout(props: { children: React.ReactNode }) {
  const steps: TaskStep[] = [
    {
      title: "已建立帳號",
      status: "done",
      subtitle: "已完成",
    },
    {
      title: "查詢 3 家公司",
      status: "doing",
      linkText: "查詢 3 家公司",
      linkUrl: "#",
      desc: "已查詢 1 / 3 家",
    },
    {
      title: "連續上站 2 天",
      status: "done",
      subtitle: "已上站 2 / 2 天",
    },
    {
      title: "將 3 家公司加入追蹤股",
      status: "todo",
      linkText: "將 3 家公司加入追蹤股",
      linkUrl: "#",
      desc: "已追蹤 0 / 3 家",
    },
  ];

  return (
    <>
      <HeadNav />
      <div className="flex w-full justify-center border-b border-[#dfdfdf]">
        <ProgressTracker
          title="新手任務進度"
          percent={50}
          steps={steps}
          width={900}
        />
      </div>
      <div className="bg-gray-50 w-full flex justify-center">
        <div className="flex" style={{ width: "1050px", minHeight: "100vh" }}>
          <SideNav></SideNav>
          {props.children}
        </div>
      </div>
    </>
  );
}
