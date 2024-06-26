import { useNavigate } from "react-router-dom";
import AntdCards from "../../../../common/AntdCards";
import {
  useGetJobsApplied,
  useGetSavedJobs,
  useGetShortListed,
} from "../../../../services/jobSeeker/setUp";

import useAuthHook from "../../../../hooks/useAuthHook";

const AppliedJobs = ({ isShorList, isSavedJobs }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthHook(null);
  const {
    data: appliedJobs,
    isLoading: appliedIsLoading,
    isError: appliedIsError,
  } = useGetJobsApplied(isAuthenticated?.id, isShorList, isSavedJobs);

  const {
    data: savedJobs,
    isPending,
    isError: savedError,
  } = useGetSavedJobs(isAuthenticated?.id, isSavedJobs);

  const { data, isLoading, isError } = useGetShortListed(
    isAuthenticated?.id,
    "directApply",
    isShorList
  );

  const handleCardClick = (e, postId, name) => {
    e.preventDefault();
    if (postId && name) {
      navigate(`/jobs/${name}/${postId}`, { replace: true });
    }
  };

  const mappedData = isShorList
    ? data?.[0]
    : isSavedJobs
    ? savedJobs?.[0]
    : appliedJobs?.[0];

  return (
    <AntdCards className={"grid grid-cols-12 w-full gap-2 p-4"}>
      {mappedData?.data?.map((items) => {
        return (
          <AntdCards
            className="col-span-4 p-4 cursor-pointer"
            onClick={(e) =>
              handleCardClick(e, items.postId, items.postInfo.company_name)
            }
          >
            <div>Company Name : {items.postInfo.company_name}</div>
            <div>Job Title : {items.postInfo.job_title}</div>
            <div>Job Location : {items.postInfo.job_location}</div>
            <div>Job Level : {items.postInfo.job_level}</div>
            <div></div>
          </AntdCards>
        );
      })}
    </AntdCards>
  );
};

export default AppliedJobs;
