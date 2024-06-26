import React from "react";
import { dashBoardData } from "../home/Data";
import AntdCards from "../../common/AntdCards";
import { useOutletContext } from "react-router-dom";
const DashBoard = ({ dataKey }) => {
  const outletContext = useOutletContext();
  const postData = outletContext && outletContext.postData;
  const foundItems = dashBoardData?.find((items) => items.key === dataKey);

  return (
    <div className="grid grid-cols-12 w-full gap-2 py-4">
      {foundItems.data.map((item) => (
        <AntdCards
          key={item.key}
          className={
            "lg:col-span-4 md:col-span-12 col-span-12 p-4 bg-[#ffffff] flex flex-col items-center justify-center min-h-60"
          }
        >
          <div className="text-lg font-medium">{item.header}</div>

          {item.key === "cvs" && Array.isArray(item.subHeader) && (
            <div>
              {item.subHeader.map((subItem) => (
                <div key={subItem.key}>
                  <div>{subItem.cvsList}</div>
                </div>
              ))}
            </div>
          )}
          {Array.isArray(item.subHeader) && item.key === "jobStatus" && (
            <div>
              {item.subHeader.map((subItem) => (
                <div key={subItem.key}>
                  <div>{subItem.status}</div>
                </div>
              ))}
            </div>
          )}

          {!Array.isArray(item.subHeader) && <div>{item.subHeader}</div>}
          {item.key === "postedJobs" && (
            <div className="font-bold">{`(${postData?.length})`}</div>
          )}
        </AntdCards>
      ))}
    </div>
  );
};

export default DashBoard;
