import AntdSearch from "../../../common/AntdSearch";
import DynamicTitle from "../../../common/DynamicTitle";

const DetailedComponent = () => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-black py-4 min-h-[100vh] flex items-center text-[#f5f5f5] pl-[48px] z-10 relative">
        <div className="flex flex-col gap-8 w-[40%]">
          <DynamicTitle classNames="font-bold text-6xl font-extrabold">
            Find Your Dream Job That Suits With Exciting Opportunities
          </DynamicTitle>
          <div>
            <p className="text-md">
              Embark on a journey towards your dream career, your ultimate job
              finding companion. We have created the platform that connects
              talented individuals with exciting opportunities.
            </p>
          </div>
          <div className="w-full">
            <AntdSearch
              className="bg-[#00788c]  rounded"
              placeholder={"Job Titles, Salaries or Companies"}
              enterButton={"Search"}
              size={"large"}
              loading={false}
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn-empmerch.newjobs.com/wp-content/uploads/2022/09/homepage-desktop.jpg"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default DetailedComponent;
