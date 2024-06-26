import FormItem from "./FormItems";
import { ConfigProvider, Radio } from "antd";

export const AntRadio = (props) => {
  const onChange = (e) => {
    props.handleRadioChange instanceof Function &&
      props.onChange(e.target.value);
  };

  const tempRule = [
    {
      required: props.required,
      message: `Please select ${props.label}`,
    },
  ];

  const localrules =
    props.rules instanceof Array ? [...tempRule, ...props.rules] : tempRule;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#119888",
        },
        components: {
          Radio: {
            radioSize: props.radioSize || 18,
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
        <Radio.Group
          onChange={onChange}
          className={`${props.className}`}
          defaultValue={props.defaultValue}
        >
          <div
            className={`flex ${
              props.deactivateAccount ? "flex-col gap-4" : null
            } whitespace-nowrap`}
          >
            {props.options?.map((item) => (
              <div key={item.value}>
                <Radio
                  className={`whitespace-nowrap !text-[12px]
                
                ${
                  props.commonRadio ? "items-center text-sm font-medium" : ""
                } `}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.option}
                </Radio>
              </div>
            ))}
          </div>
        </Radio.Group>
      </FormItem>
    </ConfigProvider>
  );
};
