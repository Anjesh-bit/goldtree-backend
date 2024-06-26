const AntdCards = ({ children, className, onClick, key }) => {
  const handleOnClick = (e) => {
    onClick instanceof Function && onClick(e);
  };
  return (
    <div
      className={`shadow-md rounded-md ${className}`}
      key={key}
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
};

export default AntdCards;
