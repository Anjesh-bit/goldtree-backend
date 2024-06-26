import { useGetShortListed } from "../../../../services/jobSeeker/setUp";
import { isAuthenticated } from "../../../../utils/auth";
import AppliedJobs from "../appliedJobs";

const ShortListedJobs = () => {
  return (
    <div>
      <AppliedJobs isShorList />
    </div>
  );
};

export default ShortListedJobs;
