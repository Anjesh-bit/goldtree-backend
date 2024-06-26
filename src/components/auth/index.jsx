import AntdTabs from "../../common/AntdTabs";
import DynamicRegistration from "./DynamicRegistration";
import EmployeeLogin from "./signIn/employer";
import JobSeekerLogin from "./signIn/jobSeeker";

const tabItems = [
  {
    key: "login",
    tabItems: [
      {
        label: "Job Seeker",
        children: <JobSeekerLogin />,
        key: "job_seeker",
      },
      {
        label: "Employer",
        children: <EmployeeLogin />,
        key: "employee",
      },
    ],
  },
  {
    key: "registration",
    tabItems: [
      {
        label: "Job Seeker",
        children: <DynamicRegistration visibleTabs />,
        key: "job_seeker",
      },
      {
        label: "Employer",
        children: <DynamicRegistration visibleTabs isEmployeeTabItems />,
        key: "employee",
      },
    ],
  },
];

const DynamicTabs = ({ dataKey }) => {
  const handleOnChangeTabs = (keys) => {};
  const founItems = tabItems?.find((items) => items.key === dataKey);
  const tabItemsFound = founItems?.tabItems;
  return (
    <div>
      <AntdTabs items={tabItemsFound} onChange={handleOnChangeTabs} centered />
    </div>
  );
};

export default DynamicTabs;
