import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { employeeSiderRoutes, JobSeekeerSiderRoutes } from "../../utils/sider";
const { Content, Sider } = Layout;

const DashBoardSider = ({
  isEmployeeDashboard,
  isJobSeekerDashboard,
  data,
}) => {
  const items = [
    {
      status: isEmployeeDashboard,
      routes: employeeSiderRoutes,
    },
    {
      status: isJobSeekerDashboard,
      routes: JobSeekeerSiderRoutes,
    },
  ];

  const foundItems = items.find((items) => items.status);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuSelect = (selected) => {
    setSelectedKeys(selected?.key);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="!bg-[#242021]"
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="vertical"
          onSelect={(selectedItem) => handleMenuSelect(selectedItem)}
          className="bg-[#242021] flex flex-col gap-4 text-md"
        >
          {foundItems.routes.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content className="px-[50px] py-4">
          <Outlet context={data} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardSider;
