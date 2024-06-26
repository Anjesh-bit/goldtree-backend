import CompanyList from "./companylist";
import DetailedComponent from "./details";
import FeaturedJobs from "./featured";

const JobPortalHome = () => {
  return (
    <div>
      <div>
        <DetailedComponent />
      </div>
      <div>
        <FeaturedJobs />
      </div>
      <div>
        <CompanyList />
      </div>
    </div>
  );
};

export default JobPortalHome;
