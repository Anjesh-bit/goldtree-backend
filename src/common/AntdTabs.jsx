import { Tabs } from "antd";

const AntdTabs = (props) => {
  return (
    <Tabs
      defaultActiveKey={props.defaultActiveKey}
      items={props.items}
      onChange={props.onChange}
      tabBarStyle={{
        ...props.tabBarStyle,
        backgroundColor: props.backgroundColor,
        width: "100%",
        fontWeight: 400,
        overflowX: "hidden",
        paddingLeft: 20,
        paddingRight: 20,
        margin: 0,
        fontSize: "16px",
      }}
      centered={props.centered}
      activeKey={props.value}
      onTabClick={props.onTabClick}
    >
      {props.children}
    </Tabs>
  );
};

export default AntdTabs;
