import { Button } from "antd";

const AntdButton = (props) => {
  const handleOnClickButton = (e) => {
    props.onClick instanceof Function && props.onClick(e);
  };
  return (
    <Button
      {...props}
      type={props.type}
      className={props.classNames}
      onClick={handleOnClickButton}
    >
      {props.children}
    </Button>
  );
};

export default AntdButton;
