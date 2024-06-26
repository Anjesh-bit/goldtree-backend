import { Input } from "antd";
const { TextArea } = Input;

const TextAreas = ({
  rows,
  placeholder,
  maxLength,
  Label,
  required,
  className,
}) => {
  return (
    <div>
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
      <TextArea
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`mb-[25px] ${className}`}
      />
    </div>
  );
};

export default TextAreas;
