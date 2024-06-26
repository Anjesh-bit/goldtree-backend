import AntdButton from "../../../common/AntdButtons";
import AntdCards from "../../../common/AntdCards";
import { dummyDataCompanyList } from "../Data";
import DynamicTitle from "../../../common/DynamicTitle";
// #00b6b4
const CompanyList = () => {
  return (
    <div className="bg-[#d5d3e4] grid items-center grid-cols-12 pr-[50px] py-[20px]">
      <div className="lg:col-span-3 bg-[#F5F5F5]">
        <div className="flex flex-col gap-6 p-4">
          <DynamicTitle classNames={"font-bold text-5xl font-extrabold"}>
            Choose Your Dream Companies
          </DynamicTitle>
          <div className="text-md font-normal">
            Start your journey towards the job search by exploring the top
            companies around nepal and also opportunities to meet the top notch
            mentors.
          </div>
        </div>
        <div className="ml-auto"></div>
      </div>
      <div className="grid grid-cols-12 lg:col-span-9 gap-2">
        {dummyDataCompanyList?.map((items, index) => (
          <AntdCards
            className={
              "lg:col-span-4 md:col-span-12 col-span-12 p-4 bg-[#f5f5f5]"
            }
            key={index}
          >
            <div className="flex flex-col gap-8">
              <div className="text-xl font-medium ">{items.company}</div>
              <div className="text-sm font-normal">{items.description}</div>
              <div className="flex gap-2">
                <AntdButton
                  classNames={
                    "bg-[#f5f5f5] !border-none  px-7 h-8 rounded-r-full text-[#f09b1e] font-medium"
                  }
                >
                  Full Time
                </AntdButton>
                <AntdButton
                  classNames={
                    "bg-[#f5f5f5] !border-none  px-7 h-8 rounded-r-full text-[#f09b1e] font-medium"
                  }
                >
                  Remote
                </AntdButton>
              </div>
            </div>
          </AntdCards>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
