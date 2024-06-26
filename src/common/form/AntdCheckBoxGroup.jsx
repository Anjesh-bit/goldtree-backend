import Checkbox from "antd/es/checkbox";

const AntdCheckBoxGroup = ({ defaultValue, options, onChange }) => {
  return (
    <Checkbox.Group defaultValue={defaultValue} onChange={onChange}>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
    </Checkbox.Group>
  );
};

export default AntdCheckBoxGroup;
