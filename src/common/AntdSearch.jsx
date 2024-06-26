import { Input } from "antd";
const { Search } = Input;
const AntdSearch = ({ placeholder, enterButton, size, loading, className }) => {
  return (
    <>
      <Search
        className={className}
        placeholder={placeholder}
        enterButton={enterButton}
        size={size}
        loading={loading}
      />
    </>
  );
};
export default AntdSearch;
