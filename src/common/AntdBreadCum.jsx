import { Breadcrumb } from "antd";

const AntdBreadCum = ({ array }) => {
  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      {array?.map((items, index) => (
        <Breadcrumb.Item key={index}>{items}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default AntdBreadCum;
