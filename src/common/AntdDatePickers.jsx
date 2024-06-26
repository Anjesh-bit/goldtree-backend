import { DatePicker } from "antd";

const DatePickers = ({
  onHandleChange,
  Label,
  required,
  value,
  defaultDate,
  format,
}) => {
  const onChange = (date, dateString) => {
    onHandleChange instanceof Function && onHandleChange(date, dateString);
  };
  return (
    <>
      {Label && (
        <div
          className={`whitespace-nowrap text-sm font-medium
          } ${
            required
              ? "after:text-[#dc4446] after:content-['*'] after:font-[400] after:ml-1 after:text-[16px]"
              : ""
          }`}
        >
          {Label}
        </div>
      )}
      <div>
        <DatePicker
          format={format}
          onChange={onChange}
          className="w-full h-30"
          value={value}
          defaultValue={defaultDate}
        />
      </div>
    </>
  );
};

export default DatePickers;
