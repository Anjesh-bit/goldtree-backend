import AntdFooter from "../common/AntdFooter";
import AntdHeader from "../common/AntdHeader";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <AntdHeader />
      <Outlet />
      <AntdFooter />
    </div>
  );
};

export default HomeLayout;
