import { Input, ConfigProvider } from "antd";
import FormItem from "./FormItems";

const Inputs = (props) => {
  const positiveNumberValidation = (_, value) => {
    if (value) {
      if (value >= 0) {
        return Promise.resolve();
      } else {
        return Promise.reject(`${props.label} should be positive`);
      }
    } else {
      return Promise.resolve();
    }
  };

  const validatePhone = (_, value) => {
    const phoneRegex = /^\d{10}$/;
    console.log(value);
    if (!phoneRegex.test(value) && value !== null) {
      return Promise.reject("Please enter a valid phone number");
    } else if (value >= 0) {
      return Promise.resolve();
    } else if (value <= 0) {
      return Promise.reject(`${props.label} should be positive`);
    } else {
      return Promise.resolve();
    }
  };

  const emailPattern = {
    pattern: new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"),
    message: "Please enter in example@email.com format",
  };

  const positive = {
    validator: positiveNumberValidation,
  };

  const phonenumber = {
    validator: validatePhone,
  };

  //pattern
  let pattern = [];
  const typeToPattern = {
    email: [emailPattern],
    pNumber: [phonenumber],
    number: [positive],
  };

  if (typeToPattern.hasOwnProperty(props.type)) {
    pattern = typeToPattern[props.type];
  }

  const tempRule = [
    {
      required: props.required,
      message: <div>{props.valMessage}</div>,
    },
    ...pattern,
  ];

  const localrules =
    props.rules instanceof Array ? [...tempRule, ...props.rules] : tempRule;

  const handelClick = (e) => {
    props.onClick instanceof Function && props.onClick(e);
  };
  const handelOnPressEnter = (e) => {
    props.onPressEnter instanceof Function && props.onPressEnter(e);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#ffffff",
        },
        components: {
          Input: {
            addonBg: "#e8e8f96e",
            fontSize: 11,
            paddingInline: 6,
            controlPaddingHorizontalSM: "8 !important",
            colorBorder: "#242021",
            controlHeight: 30,
          },
        },
      }}
    >
      {props.Label && (
        <div
          className={`whitespace-nowrap text-sm font-medium 
          } ${
            props.required
              ? "after:text-[#dc4446] after:content-['*'] after:font-[400] after:ml-1 after:text-[16px]"
              : ""
          }`}
        >
          {props.Label}
        </div>
      )}

      <FormItem {...props} localrules={localrules}>
        <Input
          defaultValue={props.defaultValue}
          min={props.minlength}
          hidden={props.hidden || false}  
          type={props.type}
          onBlur={props.onBlur}
          focus={props.focus}
          autoFocus={props.autoFocus || false}
          style={{
            ...props.style,
          }}
          onPressEnter={handelOnPressEnter}
          readOnly={props.readOnly}
          onClick={handelClick}
          maxLength={props.maxlength}
          value={props.value}
          disabled={props.disabled}
          onChange={props.handleChange}
          className={`${props.className}`}
          ref={props.ref}
          allowClear={props.allowclear || false}
          prefix={
            <div
              className={`flex items-center ${
                props.customprefix ? "pl-0" : "pl-2"
              }`}
            >
              {props.prefix}
            </div>
          }
          suffix={props.suffix}
          placeholder={props.placeholder}
          {...props.fieldProps}
        />
      </FormItem>
    </ConfigProvider>
  );
};

export default Inputs;
