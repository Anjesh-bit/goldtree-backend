import Collapse from "antd/es/collapse";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

const CollapseSearch = ({ header, children }) => {
  return (
    <Collapse>
      <CollapsePanel
        header={
          <div className="text-[0.9rem] font-normal text-[#3d2462] tracking-wide">
            {header}
          </div>
        }
      >
        {children}
      </CollapsePanel>
    </Collapse>
  );
};

export default CollapseSearch;
