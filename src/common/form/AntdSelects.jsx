import { Select, ConfigProvider, theme } from "antd";
import FormItem from "./FormItems";
import DownOutlined from "@ant-design/icons/DownOutlined";

export const Selects = (props) => {
  const tempRule = [
    {
      required: props.required,
      message: (
        <div className={`${props.prefixname ? "!mt-5" : "!mt-1"}`}>
          {props.valmessage?.charAt(0)?.toUpperCase() +
            props.valmessage?.slice(1)?.toLowerCase()}
        </div>
      ),
    },
  ];

  const localrules =
    props.rules instanceof Array ? [...tempRule, ...props.rules] : tempRule;

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionHeight: 30,
            colorBorder: "#242021",
            optionPadding: "5px 12px",
            paddingSM: 8,
            colorTextPlaceholder: "gray",
            optionFontSize: 14,
            fontSize: 12,
            colorTextQuaternary: "#6b7280cf",
            zIndexPopup: props.zIndexPopup || 1050,
            controlHeight: parseInt(props.controlHeight) || 30,
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
      <div>
        <FormItem {...props} localrules={localrules}>
          <Select
            defaultValue={props.defaultValue}
            onClear={props.onClear}
            suffixIcon={
              props.variant ? null : (
                <DownOutlined
                  className={` text-xs ${
                    props.noBorderVariant
                      ? "!text-sm !text-[#6B7280] !font-semibold"
                      : ""
                  } `}
                />
              )
            }
            ref={props?.ref}
            onDeselect={props.onDeselect}
            mode={props.mode}
            maxTagCount={"responsive"}
            dropdownStyle={props.dropdownStyle}
            showSearch={props.nosearch}
            onBlur={props.onBlur}
            variant={props.variant || props.noBorderVariant}
            autoFocus={false}
            onClick={props.onClick}
            onSearch={props.onSearch}
            disabled={props.disabled}
            onChange={props.onChange}
            onSelect={props.onSelect}
            allowClear={true}
            open={props.open}
            className={props.className}
            loading={props.loading}
            onKeyDown={props.onKeyDown}
            onMouseEnter={props.onMouseEnter}
            notFoundContent={props.waitFor}
            popupMatchSelectWidth={props.popupMatchSelectWidth || false}
            placeholder={
              <div
                className={`font-Poppins text-[11px] font-medium 2xl:text-[11px] ${
                  props.changePlaceholder
                    ? "!font-Poppins !font-semibold mr-[12px] !text-[18px] !text-[#000]"
                    : ""
                }`}
              >
                {props.placeholder}
              </div>
            }
            style={{
              ...props.style,
              width: "100%",
              height: "100%", // Set the width to props.width if it is defined, otherwise set it to '100%'
            }}
            {...(props.fieldProps || {
              showSearch: true,
              filterOption: (input, option) =>
                (option?.children || "")
                  .toLowerCase()
                  .includes(input.toLowerCase()),
            })}
          >
            {Array.isArray(props.array) &&
              props.array.map((item) => {
                return (
                  <Select.Option
                    key={item[props.value]}
                    value={item[props.value]}
                  >
                    {item[props?.description]}
                  </Select.Option>
                );
              })}
          </Select>
        </FormItem>
      </div>
    </ConfigProvider>
  );
};
