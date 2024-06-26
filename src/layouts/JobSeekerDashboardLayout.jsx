import AntdFooter from "../common/AntdFooter";
import AntdHeader from "../common/AntdHeader";
import JobSeekerMainPage from "../components/dashboard/jobseeker";

const JobSeekerDashboardLayout = () => {
  return (
    <div>
      <AntdHeader />
      <JobSeekerMainPage />
      <AntdFooter />
    </div>
  );
};

export default JobSeekerDashboardLayout;
