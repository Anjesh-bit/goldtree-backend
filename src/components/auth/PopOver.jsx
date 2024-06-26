import React from "react";
import { Popover } from "antd";

const PopOver = ({ content, title, children }) => (
  <Popover content={content} title={title}>
    {children}
  </Popover>
);

export default PopOver;
