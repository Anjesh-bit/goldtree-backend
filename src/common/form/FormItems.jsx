import { Form } from "antd";

const FormItem = (props) => {
  const localFormStyle = props.formStyle || {};

  const hiddenStyle = props.hidden ? { display: "null" } : {};

  const localStyle = props.overflowHidden
    ? { overflowX: "hidden", overflowY: "hidden", ...localFormStyle }
    : { ...localFormStyle };

  return (
    <Form.Item
      className={props.handlemargin ? "oscillation" : ""}
      {...props}
      name={props.name}
      valuePropName={props.valuePropName}
      hidden={props.hidden ? true : false}
      validateFirst
      validateStatus={props.validateStatus}
      help={props.help}
      shouldUpdate={props.shouldUpdate}
      getValueFromEvent={props.getValueFromEvent}
      initialValue={
        props.initialValue ||
        typeof props.initialValue === "boolean" ||
        props.initialValue === "" ||
        props.initialValue === 0 ||
        Array.isArray(props.initialValue)
          ? props.initialValue
          : null
      }
      style={{
        ...localStyle,
        ...hiddenStyle,
        justifyContent: "center",
        justifyItems: "center",
      }}
      {...props.formItemProps}
      rules={props.localrules}
      colon={props.colon || false}
    >
      {props.children}
    </Form.Item>
  );
};

export default FormItem;
